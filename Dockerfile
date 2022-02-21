FROM node:14.16.0 as base

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM base as test

CMD ["npm", "run", "test:watch"]

FROM base as dev

CMD ["npm", "run", "dev"]

FROM base as prod

RUN npm run test

CMD ["npm", "start"]