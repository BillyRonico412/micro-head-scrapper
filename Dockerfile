
FROM node:18-alpine3.15

COPY package.json /app/package.json

RUN cd /app && npm install

COPY . /app

WORKDIR /app

CMD ["npm", "run", "prod"]