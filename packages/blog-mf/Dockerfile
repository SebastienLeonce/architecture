FROM node:16.14.0 as base

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .
COPY packages/blog-mf/package.json packages/blog-mf/

RUN yarn install

COPY packages/blog-mf packages/blog-mf

RUN yarn workspace @architecture/blog-mf build

FROM base as test

CMD ["yarn", "workspace", "@architecture/blog-mf", "test:e2e"]

FROM base as dev

CMD ["yarn", "workspace", "@architecture/blog-mf", "dev", "--host"]

FROM base as prod

CMD ["yarn", "workspace", "@architecture/blog-mf", "dev", "--host"]