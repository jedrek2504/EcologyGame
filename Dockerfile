ARG expose_port=80
FROM node:20-alpine3.17
RUN mkdir -p /opt/app
WORKDIR /opt/app
# RUN mkdir -p /testif2/this/is/added
COPY src/package.json src/package-lock.json ./

RUN npm install
# RUN apk add sqlite && mkdir -p /pers/sqlite/databases
RUN apk add sqlite
# RUN mkdir -p /testif/this/is/added
COPY src/ .

RUN npx tsc
COPY .env ./bin/
COPY .env ./transpiled/bin/
EXPOSE $expose_port
# CMD [ "./start.sh" ]
CMD ["/bin/sh", "./start.sh"]
