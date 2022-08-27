# About

This is Repository to explore to make the BEST login API.

## Getting Started

### install NodeJS v16.x

### clone this repository

```shell
git clone https://github.com/r253hmdryou/express-best-login-api.git
```

### copy env

```shell
cp .env.example .env
```

### install dependencies

```shell
npm ci
```

### build

```shell
npm run build
```

### start server in docker

```shell
docker-compose up -d --build
```

### test

lint and jest

```bash
docker-compose up -d --build jestdb
npm run verify
```

### API Document

[swagger](./src/oas/v1.yaml)
