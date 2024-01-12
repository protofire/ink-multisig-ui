FROM node:16-alpine AS node
FROM node AS node-with-gyp
RUN apk add g++ make python3 git
FROM node-with-gyp AS builder
WORKDIR /squid
RUN git clone https://github.com/protofire/ink-multisig-squid-shibuya.git && mv ink-multisig-squid-shibuya/* . && rm -rf ink-multisig-squid-shibuya
RUN npm ci
RUN npm run build
FROM node-with-gyp AS deps
WORKDIR /squid
COPY --from=builder /squid/package.json .
COPY --from=builder /squid/package-lock.json .
RUN npm ci --production
FROM node AS squid
WORKDIR /squid
COPY --from=deps /squid/package.json .
COPY --from=deps /squid/package-lock.json .
COPY --from=deps /squid/node_modules node_modules
COPY --from=builder /squid/lib lib
# remove if no assets folder
COPY --from=builder /squid/assets assets
# remove if no db folder
COPY --from=builder /squid/db db
# remove if no schema.graphql is in the root
COPY --from=builder /squid/schema.graphql schema.graphql
# remove if no commands.json is in the root
COPY --from=builder /squid/commands.json commands.json
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh .
RUN chmod +x wait-for-it.sh
RUN apk add --no-cache bash
RUN echo -e "loglevel=silent\\nupdate-notifier=false" > /squid/.npmrc
RUN npm i -g @subsquid/commands && mv $(which squid-commands) /usr/local/bin/sqd
ENV PROCESSOR_PROMETHEUS_PORT 3000