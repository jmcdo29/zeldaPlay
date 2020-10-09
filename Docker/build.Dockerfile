FROM node:latest as base
RUN curl -L https://raw.githubusercontent.com/pnpm/self-installer/master/install.js | node
WORKDIR /app

FROM base AS prodDeps
RUN curl -sf https://gobinaries.com/tj/node-prune | sh
COPY package.json pnpm-lock.yaml ./
RUN pnpm i -Ps
RUN node-prune

FROM base AS dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install -s
COPY . .

FROM dependencies AS lint
RUN pnpm lint

# FROM dependencies AS test
# RUN pnpm affected:test

FROM dependencies AS build
RUN pnpm build -- --prod
RUN pnpm build -- api --prod

FROM node:slim as final
COPY --from=build /app/dist ./app/dist
COPY --from=prodDeps /app/node_modules ./node_modules
COPY --from=prodDeps /app/package.json ./
