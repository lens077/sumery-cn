# Sumery.cn — 静态官网发布。
#
# 发布路径（参照 Scorpius 的 Makefile 流程）：
#   site   make pages-deploy      Cloudflare Pages，海外镜像（out/）
#          make pages-deploy-eo   EdgeOne Pages，大陆镜像（out/）
#          make push              git push origin main（GitHub Actions CI 会跑全量检查）
#   k8s    make k8s-params        打印 Pangolin 隧道 + Argo CD / Helm 部署参数
#
# 凭据一律来自环境/登录态：wrangler 需已 `wrangler login`；
# edgeone 需已 `edgeone login --site china`（whoami 可验证）。

PAGES_PROJECT ?= sumery-overseas
EO_PROJECT    ?= sumery-site
EO_DOMAIN     ?= sumery-pages.apikv.com
SITE_HOST     ?= sumery.cn
GIT_REMOTE    ?= origin

.PHONY: help build check push pages-deploy pages-deploy-eo k8s-params

help:
	@echo "make build            pnpm build（静态导出 out/）"
	@echo "make check            lint + typecheck + 单测 + 内容校验"
	@echo "make push             git push origin main"
	@echo "make pages-deploy     Cloudflare Pages（$(PAGES_PROJECT)）"
	@echo "make pages-deploy-eo  EdgeOne Pages（$(EO_PROJECT) → $(EO_DOMAIN)）"
	@echo "make k8s-params       打印 Pangolin + Argo CD / Helm 部署参数"

build:
	@test -d node_modules || pnpm install --frozen-lockfile
	pnpm build

check:
	pnpm exec eslint . && pnpm exec tsc --noEmit && pnpm test && pnpm content:validate

push:
	git push $(GIT_REMOTE) main

# Cloudflare Pages：静态托管，与 Scorpius 相同的 wrangler 流程
pages-deploy: build
	pnpm dlx wrangler@4.131.1 pages deploy out --project-name=$(PAGES_PROJECT) --branch=main
	@echo "验证：curl -sI https://$(PAGES_PROJECT).pages.dev/ | head -1"

# EdgeOne Pages：大陆镜像（edgeone makers deploy，需已登录）
pages-deploy-eo: build
	@command -v edgeone >/dev/null \
	  || { echo "未安装 EdgeOne CLI。安装后重跑本目标："; echo "  npm i -g --prefix ~/.local edgeone@latest && edgeone login --site china"; exit 1; }
	edgeone makers deploy out -n $(EO_PROJECT) -e production
	@echo "EdgeOne 镜像已更新。用下面的命令验证："
	@echo "  curl -sI https://$(EO_DOMAIN)/ | head -1"

# ---------------------------------------------------------------- 集群 (Argo CD + Helm)
REGISTRY    ?= ccr.ccs.tencentyun.com/sumery
SITE_IMG    ?= $(REGISTRY)/sumery-site
K8S_PLATFORMS ?= linux/amd64,linux/arm64
CHART       ?= deploy/chart/sumery
VALUES_PROD ?= $(CHART)/values-prod.yaml
GITLAB_REMOTE ?= gitlab

# 一次发布 = 构建镜像(标签=当前 short sha) → 回写 values-prod.yaml → helm 渲染自检
# → 提交 → 推 origin + gitlab(GitLab webhook → Argo CD sumery-prod 自动同步)。
# 镜像推送需要已 `docker login ccr.ccs.tencentyun.com`；GitLab 镜像仓需先在 GitLab 建好。
TAG ?= $(shell git rev-parse --short HEAD)
k8s-release:
	@b=$$(git symbolic-ref --short -q HEAD); [ "$$b" = "main" ] \
	  || { echo "k8s-release: 当前在 '$$b' 分支；Argo CD 跟随 main"; exit 1; }
	@[ -z "$$(git status --porcelain)" ] \
	  || { echo "k8s-release: 工作区不干净；镜像会与提交对不上"; exit 1; }
	docker buildx build --platform $(K8S_PLATFORMS) \
	  -f deploy/web/Dockerfile -t $(SITE_IMG):$(TAG) --push .
	digest=$$(docker buildx imagetools inspect $(SITE_IMG):$(TAG) | sed -n 's/^Digest:[[:space:]]*//p'); \
	node -e 'const fs=require("fs");const p="$(VALUES_PROD)";let s=fs.readFileSync(p,"utf8");\
	  s=s.replace(/(tag:\s*)"[^"]*"/,`$1"$(TAG)"`);\
	  s=s.replace(/(digest:\s*)"[^"]*"/,`$1"${digest}"`);\
	  fs.writeFileSync(p,s);'
	@imgs=$$(helm template sumery $(CHART) -f $(CHART)/values.yaml -f $(VALUES_PROD) \
	   | sed -nE 's/^[[:space:]]+image: //p' | sort -u); echo "$$imgs"; \
	 echo "$$imgs" | grep -q "$(SITE_IMG):$(TAG)@" \
	   || { echo "k8s-release: 渲染出的 chart 没有运行 $(SITE_IMG):$(TAG)"; exit 1; }
	git add $(VALUES_PROD) && git commit -m "deploy: sumery-site $(TAG) → k8s" -- $(VALUES_PROD)
	git push origin main
	@git remote get-url $(GITLAB_REMOTE) >/dev/null 2>&1 \
	  && git push $(GITLAB_REMOTE) main \
	  || echo "（未配置 $(GITLAB_REMOTE) 镜像仓；Argo CD 若指向 GitHub 需确认集群可达）"
	@echo "已推送；GitLab webhook → Argo CD sumery-prod（kubectl -n sumery rollout status deploy/sumery-web）"

# 打印 Pangolin 回源与首次接管的全部参数（人工执行，脚本不代跑）
k8s-params:
	@echo "=== Pangolin（pangolin.apikv.com → org main → domain1/apikv.com）==="
	@echo "HTTP Resource: name=sumery-site subdomain=sumery domain=domain1 http=true ssl=true"
	@echo "Targets: siteId=10/9 ip=10.10.31.240 port=443 method=https"
	@echo "  tlsServerName=setHostHeader=sumery.apikv.com（指向集群 Cilium Gateway）"
	@echo "=== 首次接管 ==="
	@echo "kubectl apply -f deploy/argocd/namespace.yaml -f deploy/argocd/project.yaml"
	@echo "gitlab 仓库 Secret（私有仓才需要）：参照 blog deploy/argocd/repository.example.yaml"
	@echo "首次 automated.enabled=false：sed 's/enabled: true/enabled: false/' deploy/argocd/application.yaml | kubectl apply -f -"
	@echo "make k8s-release && kubectl -n argocd app sync sumery-prod --core"
	@echo "确认 rollout 后恢复 enabled: true 重新 apply"
