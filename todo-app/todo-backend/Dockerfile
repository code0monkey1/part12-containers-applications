FROM node:16

WORKDIR /app

COPY --chown=node:node  ./   ./

RUN npm ci --only=production

CMD npm start

