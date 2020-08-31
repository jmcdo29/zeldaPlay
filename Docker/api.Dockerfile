FROM jmcdo29/final AS build

FROM node:latest-alpine as release
COPY --from=build /tmp/node_modules ./node_modules
COPY --from=build /app/dist/apps/api ./dist/apps/api
COPY --from=build /app/package.json ./

EXPOSE 3333

CMD ["node", "dist/apps/api/main.js"]
