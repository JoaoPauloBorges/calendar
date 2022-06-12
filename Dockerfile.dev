FROM node:lts-alpine as build
WORKDIR /app
COPY package.json /app

RUN yarn install
COPY . .
RUN yarn build

FROM nginx:alpine AS frontend
VOLUME /var/cache/nginx
COPY --from=build app/build/ usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80