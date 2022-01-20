#Build app
FROM node:10-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

#Deploy app
FROM nginx:1.17.1-alpine

COPY --from=build-step /app/dist/app-vehiculo /usr/share/nginx/html