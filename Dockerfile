FROM node:18.12.1-alpine
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
COPY ./ ./
RUN npm run build
EXPOSE 3000
ENTRYPOINT [ "node", "./server/server.js" ]