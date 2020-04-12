# build
FROM node:12.16 as build-deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

# server
FROM nginx:1.17-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY /cert/ssl-cert-snakeoil.pem /etc/ssl/certs/ssl-cert-snakeoil.pem
COPY /cert/ssl-cert-snakeoil.key /etc/ssl/private/ssl-cert-snakeoil.key
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]