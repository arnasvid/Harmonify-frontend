#!/bin/bash

docker build -t arnasvid/frontend-harmonify --platform linux/amd64 .
docker push arnasvid/frontend-harmonify