FROM node:20-alpine

RUN apk add --no-cache tzdata
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node ./src/package*.json ./

USER node

RUN npm ci

COPY --chown=node:node ./src ./

ENV NODE_ENV=production

CMD [ "npm", "start" ]
