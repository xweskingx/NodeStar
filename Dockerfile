FROM php:7.0-fpm
RUN apt-get update && apt-get install -y \
        zip \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libmcrypt-dev \
        libpng12-dev \
    && docker-php-ext-install -j$(nproc) mysqli \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer


COPY composer.json /src/composer.json

RUN cd /src && composer install --no-interaction
