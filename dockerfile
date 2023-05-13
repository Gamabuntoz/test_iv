FROM node:18-alpine

USER node

RUN mkdir -p /home/node/dist/app

WORKDIR /home/node/dist/app

COPY package*.json ./

RUN yarn install

COPY --chown=node . .

RUN yarn run build

CMD ["yarn", "start"]