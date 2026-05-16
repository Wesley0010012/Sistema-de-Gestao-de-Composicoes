FROM node:22-alpine AS frontend-build

WORKDIR /app

COPY Frontend/package.json Frontend/package-lock.json ./
RUN npm ci

COPY Frontend/ ./
ENV VITE_API_BASE_URL=/api
RUN npm run build

FROM nginx:1.27-alpine

COPY --from=frontend-build /app/dist /usr/share/nginx/html
COPY --from=frontend-build /app/node_modules/pdfjs-dist/build/pdf.worker.min.mjs /usr/share/nginx/html/pdf.worker.min.mjs
COPY Backend/public /var/www/backend/public

RUN rm -f /var/www/backend/public/storage \
  && mkdir -p /var/www/backend/storage/app/public \
  && ln -s /var/www/backend/storage/app/public /var/www/backend/public/storage

COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
