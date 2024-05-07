FROM node:18-buster

WORKDIR /app/product

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8002

CMD ["npm", "start"]