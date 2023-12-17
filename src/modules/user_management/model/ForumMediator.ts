import {ForumUser} from './ForumUser.js'
import { Postable } from './Postable.js';
export interface ForumMediator {
    registerPost(user : ForumUser, post : /*Object*/Postable) : Promise<boolean>;
    unregisterPost(user : ForumUser, post : /*Object*/Postable) : Promise<boolean>;
    postList(user : ForumUser) : Promise</*Object[]*/Postable[]>;
}