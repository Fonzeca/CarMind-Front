#Build app
FROM node:alpine3.14 as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

ARG SCRIPT

RUN npm run $SCRIPT

#Deploy app
FROM nginx:alpine

COPY --from=build-step /app/dist/app-vehiculo /usr/share/nginx/html