#!/bin/sh
SCRIPT_NICKNAME="Start script"
VOLUME_GUARD_PATH="./persistent_volume_guard.sh"
echo "$SCRIPT_NICKNAME: Running packages upgrade"
apk update && apk upgrade
#echo "Start script: starting watch whoami in background"
#watch whoami

if [ ! $? -eq 0 ]; then
    echo "$SCRIPT_NICKNAME: WARNING - Failed to update/upgrade the packages. Proceeding with the current version."
fi
echo "$SCRIPT_NICKNAME: Setting environment variables..."
chmod u+rx ./config.sh
. ./config.sh
if [ $? -eq 0 ]; then
    /bin/sh $VOLUME_GUARD_PATH
    if [ $? -eq 0 ]; then
        echo "$SCRIPT_NICKNAME: setup db sync..."
        npm run migrate

        if [ $? -eq 0 ]; then
            echo "$SCRIPT_NICKNAME: Launching core application..."
            npm run pm2
        else
            echo "$SCRIPT_NICKNAME: ERROR - Failed to setup db sync"
        fi
    else
        echo "$SCRIPT_NICKNAME: ERROR - Persistent volume guard error" 
    fi
else 
    echo "$SCRIPT_NICKNAME: ERROR - Failed to set environment variables, check for corrupted or inaccessible config.sh file"
fi