#!/usr/bin/env bash

export IMAGE_NAME="${REPO_NAME:-gamification-platform-backend}:${REPO_TAG:-latest}"
docker-compose -f 'docker-compose.test.yml' -p ci up --build --abort-on-container-exit
exit $(docker wait ci_gamification-platform-backend_1)


