FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.15-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80