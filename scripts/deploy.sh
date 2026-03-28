#!/bin/bash
set -e

cd ~/workspace/dev/portfolio
git fetch --tags
git checkout $1

GIT_TAG="$1"
echo "Deploying version: $GIT_TAG"

docker build -t portfolio:$GIT_TAG -t portfolio:latest .
docker save portfolio:$GIT_TAG | sudo k3s ctr images import -
sudo kubectl set image deployment/portfolio portfolio=portfolio:$GIT_TAG
sudo kubectl rollout status deployment/portfolio --timeout=120s
