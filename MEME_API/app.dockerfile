FROM node:8-alpine

ENV HOME=/opt/app

VOLUME $HOME
WORKDIR $HOME

RUN npm install --g nodemon
#install tini
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["nodemon", "index.js"]
