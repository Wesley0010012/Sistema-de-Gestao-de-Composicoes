FROM php:8.4-fpm-alpine

WORKDIR /var/www/backend

RUN apk add --no-cache \
    bash \
    freetype-dev \
    icu-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    libzip-dev \
    oniguruma-dev \
    postgresql-dev \
  && docker-php-ext-configure gd --with-freetype --with-jpeg \
  && docker-php-ext-install gd intl mbstring pdo_pgsql zip

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY Backend/composer.json Backend/composer.lock ./
RUN composer install \
    --no-dev \
    --prefer-dist \
    --no-interaction \
    --no-progress \
    --no-scripts \
    --optimize-autoloader

COPY Backend/ ./
COPY docker/backend/entrypoint.sh /usr/local/bin/backend-entrypoint

RUN rm -f bootstrap/cache/*.php \
  && composer dump-autoload --optimize --no-scripts \
  && chmod +x /usr/local/bin/backend-entrypoint \
  && mkdir -p storage/app/public storage/framework/cache storage/framework/sessions storage/framework/views bootstrap/cache \
  && chown -R www-data:www-data storage bootstrap/cache

ENTRYPOINT ["backend-entrypoint"]
CMD ["php-fpm"]
