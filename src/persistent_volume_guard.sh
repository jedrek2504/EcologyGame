#!/bin/sh
SCRIPT_NICKNAME="Persistent volume guard script"
# export SQLITE_DBS_LOCATION="/pers/sqlite/databases"
# export USRFILES_LOCATION="/pers/usrfiles"

echo "$SCRIPT_NICKNAME: Checking the persistent volume..."
if [ -d $PERSISTENT_VOL_LOCATION ]; then
    if [ ! -d $SQLITE_DBS_LOCATION ]; then
        echo "$SCRIPT_NICKNAME: No $SQLITE_DBS_LOCATION directory found. Creating it..." 
        mkdir -p $SQLITE_DBS_LOCATION
        if [ $? -eq 0 ]; then
            echo "$SCRIPT_NICKNAME: Successfully created the $SQLITE_DBS_LOCATION directory"
        else
            echo "$SCRIPT_NICKNAME: ERROR - Cannot create the $SQLITE_DBS_LOCATION directory. Maybe a permissions issue?"
            exit 1
        fi
    fi
    #if [ ! -d /pers/usrfiles ]; then
    #    echo "$SCRIPT_NICKNAME: No $USRFILES_LOCATION directory found. Creating it..."
    #    mkdir -p $USRFILES_LOCATION
    #    if [ $? -eq 0 ]; then
    #        echo "$SCRIPT_NICKNAME: Successfully created the $USRFILES_LOCATION directory"
    #    else
    #        echo "$SCRIPT_NICKNAME: ERROR - Cannot create the $USRFILES_LOCATION directory. Maybe a permissions issue?"
    #        exit 1
    #    fi
    #fi
else
    echo "$SCRIPT_NICKNAME: ERROR - The cloud volume is not mounted at /ecopers" 
    exit 1
fi
echo "$SCRIPT_NICKNAME: Ok"
exit 0
