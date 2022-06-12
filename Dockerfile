FROM node:lts-alpine as build
WORKDIR /app
COPY package.json /app

RUN yarn install
COPY . .
RUN yarn build

FROM nginx:latest AS frontend
VOLUME /var/cache/nginx
COPY --from=build app/build/ usr/share/nginx/html
COPY ./nginx/heroku.nginx.conf /etc/nginx/conf.d/default.conf.template

CMD /bin/sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
