FROM ubuntu
COPY --from=node:latest /usr/local/bin/node /usr/local/bin/node
# ENV PATH="/usr/local/bin/node:${PATH}"
RUN mkdir -p /srv/app
WORKDIR /srv/app
ENTRYPOINT [ "node", "toto.js" ]

