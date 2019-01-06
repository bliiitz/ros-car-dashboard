FROM node:carbon-alpine

RUN mkdir -p /home/node
WORKDIR /home/node

ADD . /home/node
RUN npm install && cd src/public && npm install
    
CMD ["npm", "start"]

EXPOSE 3000
