FROM node:16.14.0 as base

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .
COPY packages/notification-sender-ms/package.json packages/notification-sender-ms/

RUN yarn install

COPY packages/notification-sender-ms packages/notification-sender-ms

RUN yarn workspace @architecture/notification-sender-ms build

FROM base as test

CMD ["yarn", "workspace", "@architecture/notification-sender-ms", "test:watch"]

FROM base as dev

CMD ["yarn", "workspace", "@architecture/notification-sender-ms", "dev"]

FROM node:16.14.0 as build-env

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .
COPY packages/notification-sender-ms/package.json packages/notification-sender-ms/

RUN yarn install --production


FROM gcr.io/distroless/nodejs:16 as prod

WORKDIR /usr/app

COPY package.json .
COPY packages/notification-sender-ms/package.json packages/notification-sender-ms/

COPY --from=base /usr/app/packages/notification-sender-ms/build packages/notification-sender-ms/build
COPY --from=build-env /usr/app/node_modules node_modules
COPY --from=build-env /usr/app/packages/notification-sender-ms/node_modules packages/notification-sender-ms/node_modules

CMD ["--experimental-specifier-resolution", "node", "packages/notification-sender-ms/build/src/index.js"]