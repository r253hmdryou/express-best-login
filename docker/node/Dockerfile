# builder
FROM node:16.17.0-slim as base
EXPOSE 3000
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    mariadb-client \
    procps \
    tini \
    && rm -rf /var/lib/apt/lists/*

RUN npm i --location=global pm2@5
COPY --chown=node:node docker/node/entrypoint.sh ./

COPY package.json package-lock.json ./
RUN npm ci --production

COPY ["pm2.yaml", ".sequelizerc", ".env", "./"]

# builder
FROM base as builder
RUN npm ci
COPY . .
RUN npm run build

# runner
FROM base as runner
ENV NODE_ENV=production
USER node
COPY --from=builder --chown=node:node /app/dist ./dist

# ENTRYPOINT ["./entrypoint.sh"]
ENTRYPOINT ["tini", "--", "./entrypoint.sh"]
