# build
FROM node:12.16 as build-deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

# host
FROM nginx:1.17-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]