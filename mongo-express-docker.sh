#!/bin/bash

docker run -d --rm \
    --name mongo-express \
    --link local-mongo \
    -p 8081:8081 \
    -e ME_CONFIG_OPTIONS_EDITORTHEME="ambiance" \
    -e ME_CONFIG_MONGODB_SERVER="local-mongo" \
    -e ME_CONFIG_BASICAUTH_USERNAME="admin" \
    -e ME_CONFIG_BASICAUTH_PASSWORD="mysecretpassword" \
    -e ME_CONFIG_MONGODB_ADMINUSERNAME="mongoadmin" \
    -e ME_CONFIG_MONGODB_ADMINPASSWORD="secret" \
	 mongo-express:1.0.0-alpha.4 
