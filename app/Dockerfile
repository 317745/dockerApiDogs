FROM node:18

WORKDIR /apiDogs
COPY package.json .
RUN npm install

COPY . .
CMD ["npm", "start"]