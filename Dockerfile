FROM node:20-alpine AS build

WORKDIR /app

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

RUN yarn install

COPY . /app

RUN yarn build

FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache curl
RUN adduser -D -h /app app

USER app

COPY --from=build /app/package.json .
COPY --from=build /app/yarn.lock .

RUN yarn install --production
RUN sed -i s@build/index.js@index.js@g package.json

COPY --from=build /app/build .
COPY --from=build /app/prisma ./prisma

RUN yarn db:generate

STOPSIGNAL SIGQUIT
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "curl", "http://localhost:8080" ]

CMD [ "yarn", "start" ]
