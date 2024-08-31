FROM node as vite-app

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn run build

FROM nginx:latest

WORKDIR /usr/share/nginx/html

COPY --from=vite-app /app/dist .

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d/

COPY .env .

EXPOSE 80

CMD nginx -g 'daemon off;'