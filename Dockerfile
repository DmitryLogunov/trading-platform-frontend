FROM node:16-slim

WORKDIR /app
COPY package*.json ./
EXPOSE 8080

RUN yarn

COPY . ./
RUN yarn build

CMD ["yarn", "start"]
