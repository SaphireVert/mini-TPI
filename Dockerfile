FROM node
RUN corepack enable
RUN mkdir -p /srv/app
WORKDIR /srv/app/kata-manga-app
ENTRYPOINT [ "yarn", "start" ]

