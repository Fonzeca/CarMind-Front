#Build app
FROM node:alpine3.14 as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

ARG PRODUCTION

RUN npm run build $PRODUCTION

#Deploy app
FROM nginx:alpine

COPY --from=build-step /app/dist/app-vehiculo /usr/share/nginx/html

VOLUME /root/Alexis/Proyectos/configs/carmind_front/ /etc/nginx/