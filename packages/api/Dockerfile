FROM node:14.16.0 as base

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .
COPY packages/api/package.json packages/api/

RUN yarn install

COPY packages/api packages/api

ARG API_URL 
ENV API_URL=${API_URL} 

RUN yarn workspace @architecture/api build

FROM base as test

CMD ["yarn", "workspace", "@architecture/api", "test:watch"]

FROM base as dev

CMD ["yarn", "workspace", "@architecture/api", "dev"]

FROM node:14.16.0 as build-env

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .
COPY packages/api/package.json packages/api/

RUN yarn install --production


FROM gcr.io/distroless/nodejs:14 as prod

WORKDIR /usr/app

COPY package.json .
COPY packages/api/package.json packages/api/

COPY --from=base /usr/app/packages/api/build packages/api/build
COPY --from=build-env /usr/app/node_modules node_modules
COPY --from=build-env /usr/app/packages/api/node_modules packages/api/node_modules

CMD ["packages/api/build/src/index.js"]