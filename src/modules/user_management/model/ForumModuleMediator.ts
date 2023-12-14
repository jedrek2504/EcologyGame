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

    private static _instance: ForumModuleMediator
    public static getInstance () : ForumModuleMediator {
      if (!this._instance) this._instance = new ForumModuleMediator()
      return this._instance
    }
}