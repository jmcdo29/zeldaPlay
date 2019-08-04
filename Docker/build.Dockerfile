FROM node:10 as base
WORKDIR /app

FROM base AS dependencies
COPY package*.json ./
RUN npm install --prod --silent
RUN cp -R node_modules /tmp/node_modules
RUN npm install --silent
COPY . .

FROM dependencies AS lint
RUN npm run affected:lint

FROM dependencies AS test
RUN npm run affected:test

FROM dependencies AS build
RUN npm run affected:build -- --prod
COPY --from=dependencies /tmp/node_modules .
COPY --from=dependencies /app/package.json ./
