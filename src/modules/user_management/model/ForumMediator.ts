import {ForumUser} from './ForumUser.js'
export interface ForumMediator {
    registerPost(user : ForumUser, post : Object) : Promise<boolean>;
    unregisterPost(user : ForumUser, post : Object) : Promise<boolean>;
    postList(user : ForumUser) : Promise<Object[]>;
}