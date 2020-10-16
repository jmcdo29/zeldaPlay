FROM jmcdo29/build AS build

FROM node:alpine as release
COPY --from=build ./node_modules ./node_modules
COPY --from=build /app/dist/apps/api ./dist/apps/api
COPY --from=build /package.json ./

EXPOSE 3333

CMD ["node", "dist/apps/api/main.js"]
