FROM node:latest as base
RUN curl -L https://raw.githubusercontent.com/pnpm/self-installer/master/install.js | node
WORKDIR /app

FROM base AS dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install -Ps
RUN cp -R node_modules /tmp/node_modules
RUN pnpm install -s
COPY . .

FROM dependencies AS lint
RUN pnpm affected:lint

# FROM dependencies AS test
# RUN pnpm affected:test

FROM dependencies AS build
RUN pnpm affected:build -- --prod

FROM node:slim as final
COPY --from=build /app/dist .
COPY --from=dependencies /tmp/node_modules .
COPY --from=dependencies /app/package.json ./
