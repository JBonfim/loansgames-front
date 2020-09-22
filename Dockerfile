FROM node:12.11.1-alpine as build-step

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.16.0-alpine as prod-stage
COPY --from=build-step /app/dist/loansgames-front /usr/share/nginx/html

EXPOSE 80
CMD ["nginx","-g","daemon off;"]




