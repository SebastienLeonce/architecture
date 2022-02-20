FROM node:14.16.0-alpine3.10 as base

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

FROM base as prod

RUN npm run build

CMD ["npm", "start"]

FROM base as dev

RUN npm run build

CMD ["npm", "run", "dev"]