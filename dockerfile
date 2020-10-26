# BUILD STAGE
FROM node:latest as build-stage

WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build

# DEPLOY TO NGINX
FROM nginx:latest

COPY --from=build-stage /app/build/ /usr/share/nginx/html

# NGINX CONFIG FILE
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf