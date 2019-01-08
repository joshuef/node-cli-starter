#!/bin/bash


APP_NAME="KnockOn"

TARGET_DIR=${BASH_SOURCE%$APP_NAME.app*}

logger "knooook $@, $TARGET_DIR lib/index.js "
# logger "---> $TARGET_DIRlib/index.js"
"$TARGET_DIR"lib/index.js "$@"





exit 0
