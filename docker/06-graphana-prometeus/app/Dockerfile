# Development stage
FROM node:22.16.0-alpine AS base
WORKDIR /usr/src/app
COPY . .
COPY package*.json ./
RUN npm install
CMD [ "node","index.js" ]