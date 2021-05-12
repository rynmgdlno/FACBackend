FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# change previous line for production:
# RUN npm ci --only=production

COPY . .
EXPOSE 42069
CMD [ "node", "server.js" ]