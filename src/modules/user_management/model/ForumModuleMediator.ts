import {ForumMediator} from './ForumMediator.js'
import {ForumUser} from './ForumUser.js'
export class ForumModuleMediator implements ForumMediator {
    registerPost(user : ForumUser, post : Object) : boolean {
        return false;
    }
    unregisterPost(user : ForumUser, post : Object) : boolean {
        return false;
    }
    postList(user : ForumUser) : Object[] {
        return [];
    }
}