FROM jmcdo29/build AS build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/apps/tabletop-companion .
