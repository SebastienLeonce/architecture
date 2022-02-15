FROM node:16.13.1
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . ./
CMD ["npm", "run", "dev"]