#!/bin/bash
local=$PWD/mongodb-data

if [[ ! -d $local ]]
then
  echo "Directory does not exist => $local"
  exit -1
fi

docker run -d --rm \
  -p 27017:27017 \
  --name local-mongo \
	-e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
	-e MONGO_INITDB_ROOT_PASSWORD=secret \
	-v $local:/data/db \
	mongo:5.0.16
