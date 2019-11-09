FROM node:12.10.0

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci -qy

COPY node_modules .

EXPOSE 3000

CMD ["npm", "start"]
