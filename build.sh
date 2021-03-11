#!/usr/bin/env bash

export PORT_NUMBER='5000'
export EMAIL_ADDRESS='example@mail.com'
export EMAIL_PASSWORD='123123'
export EMAIL_HOST='smtp.gmail.com'

export DB_USER='postgres'
export DB_PASSWORD='1234567'
export DB_HOST='localhost'
export DB_PORT='5432'
export DB_DATABASE='prod_test1'

export NODE_ENV='development'

PS3='Select build type: '
options=("Local build" "Quit")
select option in "${options[@]}"
do
    case $option in
        "Local build")
            npm run dev
            break
            ;;
        "Quit")
            break
            ;;
        *) echo "invalid option $REPLY";;
    esac
done
