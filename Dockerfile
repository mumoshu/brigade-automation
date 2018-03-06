FROM node:9

MAINTAINER David Dooling <david@atomist.com>

ENV DUMB_INIT_VERSION=1.2.1

RUN curl -s -L -O https://github.com/Yelp/dumb-init/releases/download/v$DUMB_INIT_VERSION/dumb-init_${DUMB_INIT_VERSION}_amd64.deb \
    && dpkg -i dumb-init_${DUMB_INIT_VERSION}_amd64.deb \
    && rm -f dumb-init_${DUMB_INIT_VERSION}_amd64.deb

RUN mkdir -p /opt/app

WORKDIR /opt/app

ADD package.json ./
ADD config ./config
ADD package-lock.json ./
ADD build ./build
RUN ls -lah

ENV NPM_CONFIG_LOGLEVEL warn

RUN npm config set @atomist:registry https://atomist.jfrog.io/atomist/api/npm/npm-dev/

RUN npm install

ENV SUPPRESS_NO_CONFIG_WARNING true

EXPOSE 2866

ENTRYPOINT ["dumb-init", "node", "--trace-warnings", "--expose_gc", "--optimize_for_size", "--always_compact", "--max_old_space_size=128"]

CMD ["node_modules/@atomist/automation-client/start.client.js"]
