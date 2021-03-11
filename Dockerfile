FROM node:12.14.1-alpine

WORKDIR /usr/src
RUN mkdir boilerplate

# copy xplorer service and install dependencies
WORKDIR /usr/src/boilerplate
COPY . .

RUN npm install

WORKDIR /usr/src/boilerplate/client
RUN echo "GENERATE_SOURCEMAP=false" > ./.env
RUN npm ci --only=production

RUN npm run build

WORKDIR /usr/src/boilerplate

# start services
CMD ["npm", "start"]
