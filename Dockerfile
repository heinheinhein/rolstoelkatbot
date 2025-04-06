FROM node:22 AS typescript-build

COPY . /rolstoelkatbot/

WORKDIR /rolstoelkatbot

RUN npm ci && \
    npm run build


FROM node:22-alpine AS main

COPY --chown=node:node --from=typescript-build /rolstoelkatbot/dist /rolstoelkatbot/dist
COPY --chown=node:node ./package*.json /rolstoelkatbot/
COPY --chown=node:node ./media /rolstoelkatbot/media

WORKDIR /rolstoelkatbot

RUN apk add --no-cache tzdata && \
    npm ci --omit=dev

USER node

ENV NODE_ENV=production

CMD [ "npm", "start" ]
