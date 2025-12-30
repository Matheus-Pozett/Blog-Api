FROM node:16-bullseye
RUN apt update
RUN apt install lsof
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY src src
COPY .eslintignore .
COPY .eslintrc.json .
COPY .sequelizerc .