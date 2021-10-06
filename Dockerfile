FROM php:7.4-fpm

RUN docker-php-ext-install pdo_mysql

RUN pecl install apcu

RUN apt-get update && \
apt-get install -y \
libicu-dev \
libzip-dev \
libfreetype6-dev \
libjpeg62-turbo-dev \
libpng-dev \
libxslt-dev \
nodejs \
npm

RUN docker-php-ext-configure intl
RUN docker-php-ext-install intl
RUN docker-php-ext-install zip
RUN docker-php-ext-install xsl
RUN docker-php-ext-install -j$(nproc) gd
RUN docker-php-ext-enable apcu

RUN cd /usr/local/etc/php/conf.d/ && \
  echo 'memory_limit = -1' >> /usr/local/etc/php/conf.d/docker-php-memlimit.ini

WORKDIR /usr/src/app

COPY --chown=1000:1000 ./ /usr/src/app
RUN mkdir "/.npm"
RUN chown -R 1000:1000 "/.npm"

RUN PATH=$PATH:/usr/src/app/vendor/bin:bin

RUN echo "$(curl -sS https://composer.github.io/installer.sig) -" > composer-setup.php.sig \
      && curl -sS https://getcomposer.org/installer | tee composer-setup.php | sha384sum -c composer-setup.php.sig \
      && php composer-setup.php && rm composer-setup.php* \
      && chmod +x composer.phar && mv composer.phar /usr/bin/composer