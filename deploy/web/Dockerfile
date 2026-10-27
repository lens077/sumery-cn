# 官网静态产物：构建放在镜像内，构建机只需要本仓库。
# pnpm 版本显式钉住，不跟随基础镜像漂移。
FROM node:22-alpine AS site
RUN npm install -g pnpm@12.6.0
WORKDIR /build
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY pnpm-workspace.yaml ./
# allowBuilds 已在 pnpm-workspace.yaml 里放行 esbuild，install 直接跑
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM nginxinc/nginx-unprivileged:1.29-alpine
COPY --from=site /build/out /srv/site
COPY deploy/web/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080 8081
