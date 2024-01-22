import { UserNotification } from "./UserNotification.js";
import { IntermoduleNotificationManager } from "./IntermoduleNotificationManager.js";
import {User} from './User.js';

import db from '../database.js';
//const webpush = require('web-push');
import webpush from 'web-push';

export class NotificationManager implements IntermoduleNotificationManager {
    //vapid keys
    private publicKey : string = "BFrYf_JEfszhnsdvGFwNXpB-GKPWstB5EI4SUsQL3qr7PVbFqEW-UoonGfa6TxWFbyAAi9Pc7Z3zCDm0sd_2IzQ";
    private privateKey : string = "7x8q1hvGcP0K_TtTBz_6M-GKccIKmCgl0gO4b32eVPM";
    
    constructor() {
        webpush.setVapidDetails("mailto: ecologygame@info.com", this.publicKey, this.privateKey);
    }
    
    notifyUser(userID : string, notification : UserNotification) : Promise<void> {
        //Send notification to all devices of user (based on the UserNotifierInfo table)
        return new Promise<void>((resolve, reject) => {
            db.UserNotifierInfo.findAll({
                where: {
                    user_id: userID
                }
            }).then((userNotifierInfos : any) => {
                if (userNotifierInfos == null || userNotifierInfos.length == 0) {
                    reject(`User with ID ${userID} does not exist`);
                }
                else {
                    let promises : Promise<webpush.SendResult>[] = [];
                    for (let userNotifierInfo of userNotifierInfos) {
                        let pushSubscription = {
                            endpoint: userNotifierInfo.endpoint,
                            keys: {
                                p256dh: /*JSON.parse(userNotifierInfo.p256dh)*/userNotifierInfo.p256dh,
                                auth: /*JSON.parse(userNotifierInfo.auth)*/userNotifierInfo.auth
                            }
                        };
                        promises.push(webpush.sendNotification(pushSubscription, JSON.stringify({
                            title: notification.getTitle(),
                            message: notification.getMessage()
                        })));
                    }
                    Promise.all(promises).then(() => {
                        resolve();
                    }).catch((error : any) => {
                        reject(`Error while sending notification: ${error}`);
                    });
                }
            }).catch((error : any) => {
                reject(`Error while fetching user: ${error}`);
            });
        });
        /*return new Promise<void>((resolve, reject) => {
            db.Person.findOne({
                where: {
                    user_id: userID
                }
            }).then((user : any) => {
                if (user == null) {
                    reject(`User with ID ${userID} does not exist`);
                }
                else {
                    let pushSubscription = {
                        endpoint: user.endpoint,
                        keys: {
                            p256dh: user.p256dh,
                            auth: user.auth
                        }
                    };
                    webpush.sendNotification(pushSubscription, JSON.stringify({
                        title: notification.getTitle(),
                        message: notification.getMessage()
                    })).then(() => {
                        resolve();
                    }).catch((error : any) => {
                        reject(`Error while sending notification: ${error}`);
                    });
                }
            }).catch((error : any) => {
                reject(`Error while fetching user: ${error}`);
            });
        });*/
    }

    registerUser(user : User, endpoint : string, p256dh : string, auth : string) : Promise<void> {
        //Register user device (endpoint, p256dh, auth) in the UserNotifierInfo table
        return new Promise<void>((resolve, reject) => {
            db.UserNotifierInfo.create({
                user_id: user.getId(),
                endpoint: endpoint,
                p256dh: /*JSON.stringify(p256dh)*/p256dh,
                auth: /*JSON.stringify(auth)*/auth
            }).then(() => {
                resolve();
            }).catch((error : any) => {
                reject(`Error while registering user: ${error}`);
            });
        });


    }
    unregisterUser(user : User) : Promise<void> {
        //Unregister user device (endpoint, p256dh, auth) in the UserNotifierInfo table
        return new Promise<void>((resolve, reject) => {
            db.UserNotifierInfo.destroy({
                where: {
                    user_id: user.getId()
                }
            }).then(() => {
                resolve();
            }).catch((error : any) => {
                reject(`Error while unregistering user: ${error}`);
            });
        });
    }

    private static _instance: NotificationManager
    public static getInstance () : NotificationManager {
      if (!this._instance) this._instance = new NotificationManager()
      return this._instance
    }
}