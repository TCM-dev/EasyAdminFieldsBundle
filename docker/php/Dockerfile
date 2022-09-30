FROM php:8.1-fpm-alpine

# Composer install
COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer

# Install dev dependencies
RUN apk add --no-cache --virtual .build-deps $PHPIZE_DEPS curl-dev imagemagick-dev \
    libtool libxml2-dev postgresql-dev sqlite-dev

# Install production dependencies
RUN apk add --no-cache bash curl freetype-dev g++ gcc git icu-dev icu-libs imagemagick  \
    libc-dev libjpeg-turbo-dev libpng-dev libzip-dev make mysql-client oniguruma-dev \
    postgresql-libs supervisor zlib-dev

# Install PECL and PEAR extensions
RUN pecl install igbinary redis imagick openswoole

# Enable PECL and PEAR extensions
RUN docker-php-ext-enable igbinary redis imagick openswoole

# Install php extensions
RUN docker-php-ext-install bcmath calendar curl exif gd intl mbstring pdo pdo_mysql \
    pdo_pgsql pdo_sqlite pcntl soap xml zip

# Install Symfony CLI
RUN curl -1sLf 'https://dl.cloudsmith.io/public/symfony/stable/setup.alpine.sh' | bash
RUN apk add --no-cache symfony-cli

# Cleanup dev dependencies
RUN apk del -f .build-deps

# Misc
WORKDIR /usr/src

# Make every files owned by current user instead of Docker
RUN chown 1000:1000 /usr/src