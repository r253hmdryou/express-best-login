# About

This is plain express typescript project.

## Requirements

- NodeJS v16.x
- npm

## Setup

install dependencies packages

```bash
npm ci
```

start server in docker

```bash
docker-compose up -d --build
```

test

```bash
docker-compose up -d --build jestdb
npm run test
```
