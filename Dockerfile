FROM node:12.19-buster-slim

RUN mkdir /src
WORKDIR /src

COPY package.json /src
RUN npm install

COPY . /src
# For local builds
CMD ["/src/node_modules/.bin/ng", "build", "--output-path", "build", "--base-href", "/"]

# Production - no debug and uses production environment.prod.ts config
#CMD ["/src/node_modules/.bin/ng", "build", "--prod", "--output-path", "build", "--base-href", "FRIDAY_FRONTEND_BASE_PATH"]
