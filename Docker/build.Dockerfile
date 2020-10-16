FROM node:latest as base
RUN curl -L https://raw.githubusercontent.com/pnpm/self-installer/master/install.js | node
WORKDIR /app

FROM base AS prodDeps
RUN curl -sf https://gobinaries.com/tj/node-prune | sh
COPY package.json pnpm-lock.yaml ./
RUN pnpm i -Ps --no-optional
RUN node-prune

FROM base AS dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY tsconfig.* \
  workspace.json \
  nginx.conf \
  nx.json \
  ./
COPY apps/ apps/
COPY libs/ libs/

FROM dependencies AS build
RUN pnpm build -- --prod
RUN pnpm build -- api --prod

FROM node:alpine as final
COPY --from=build /app/dist ./app/dist
COPY --from=prodDeps /app/node_modules ./node_modules
COPY --from=prodDeps /app/package.json ./
