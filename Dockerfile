FROM node:12.14.0-alpine as base

ARG PORT
ARG ENV

ENV NODE_ENV $ENV

# Use multi-stage build in order to reduce the final image size
FROM base as setup

RUN mkdir -p /usr/local/app
WORKDIR /usr/local/app

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install --production

# Create workind directory and copy only nessesary files there
FROM setup as builder

RUN mkdir -p /config && \
    mkdir -p /build

COPY ./build ./build

# Final steps... expose port and execute the script
FROM builder

# set execution user
USER node

EXPOSE $PORT
CMD ["node", "./build/main.js"]
