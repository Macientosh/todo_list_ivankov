FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG VITE_MERRIAM_WEBMASTER_DICT_API_KEY
ARG VITE_AIR_QUALITY_OPEN_DATA_PLATFORM_API_KEY
ENV VITE_AIR_QUALITY_OPEN_DATA_PLATFORM_API_KEY=$VITE_AIR_QUALITY_OPEN_DATA_PLATFORM_API_KEY
ENV VITE_MERRIAM_WEBMASTER_DICT_API_KEY=$VITE_MERRIAM_WEBMASTER_DICT_API_KEY

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY ./deploy/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]