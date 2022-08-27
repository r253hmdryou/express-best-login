#!/bin/sh
set -eu

if [ -n "$DB_PING_HOST" ]; then
    set +e
    echo `date '+%Y/%m/%d %H:%M:%S'` $0 "[INFO] Connection confriming..."
    while :
    do
        result=`/usr/bin/mysqladmin ping -h ${DB_PING_HOST} -u${DB_PING_USER} -p${DB_PING_PASS}`
        if echo $result|grep 'alive'; then
        break
        fi
        sleep 1;
    done
    set -e
fi

npm run db:migrate
pm2-runtime pm2.yaml
