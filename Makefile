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
	pnpm install --frozen-lockfile && pnpm build

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
