#FROM node:18
#
#WORKDIR /app
#
#COPY package*.json ./
#
#RUN yarn install
#
#COPY . .
#
#COPY ./dist ./dist
#
#CMD ["yarn", "run", "start"]


FROM node:18-alpine

WORKDIR /src

COPY . .

RUN yarn install

RUN yarn run build

USER node

CMD ["yarn", "run", "start"]