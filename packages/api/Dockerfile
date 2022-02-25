FROM node:14.16.0 as base

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .
COPY packages/api/package.json packages/api/

RUN yarn install

COPY packages/api packages/api

RUN yarn workspace @architecture/api build

FROM base as test

CMD ["yarn", "workspace", "@architecture/api", "test:watch"]

FROM base as dev

CMD ["yarn", "workspace", "@architecture/api", "dev"]

FROM base as prod

CMD ["yarn", "workspace", "@architecture/api", "start"]