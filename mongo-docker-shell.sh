docker run -it --rm --link local-mongo mongo:5.0.16 \
	mongosh --host local-mongo \
		-u mongoadmin \
		-p secret \
		--authenticationDatabase admin \
		some-db
