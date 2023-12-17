import {ForumMediator} from './ForumMediator.js'
import {ForumUser} from './ForumUser.js'

import db from "../database.js"
import { Postable } from './Postable.js';

export class ForumModuleMediator implements ForumMediator {
	/**
	 * 
	 * @param {String} post.content Text content of the post
	 * @param {String | null} post.title Title of the post
	 * @param {Number | null} post.parent_id ID of the post that this post replies to
	 * @returns 
	 */
    async registerPost(user: ForumUser, post: /*any*/Postable): Promise<boolean> {
		const userEntity: any = await db.Person.findByPk(user.getId());
		userEntity.is_forum_contributor = true;
		await userEntity.save();
		await db.ForumPost.create({
			creator_id: user.getId() as unknown as string,
			content: /*post.content*/JSON.stringify(post.getDataObject()),
			title: /*post.title*/post.getName(),
			//parent_id: /*post.parent_id*/post.getParent(),
		});
        return true;
    }
	/**
	 * 
	 * @param {String} post.post_id ID of the post to remove
	 * @returns 
	 */
    async unregisterPost(user: ForumUser, post: /*any*/Postable): Promise<boolean> {
		const deletedCount = await db.ForumPost.destroy({
			where: {
				post_id: /*post.post_id*/post.getIdentifier() as unknown as Number,
			}
		});
        return deletedCount != 0;
    }

	/**
	 * @description returns list of objects that were made by users. Attributes: post_id, user_id, content, title, parent_id, timestamp
	 */

    async postList(user: ForumUser): Promise<any[]> {
		const items: any[] = await db.ForumPost.findAll({
			where: {
				user_id: user.getId()
			}
		});
        return items.map((post) => {
			/*return {
				post_id: post.post_id,
				user_id: post.user_id,
				content: post.content,
				title: post.title,
				parent_id: post.parent_id,
				timestamp: post.created_at,
			}*/
            return PostHelper.createInstance(post.user_id, 
                                            JSON.parse(post.content), 
                                            post.title, 
                                            post.post_id);
		});
    }

    private static _instance: ForumModuleMediator
    public static getInstance () : ForumModuleMediator {
      if (!this._instance) this._instance = new ForumModuleMediator()
      return this._instance
    }
}

class PostHelper {
    creator : ForumUser;
    dataObject : any;
    name : string;
    identifier : string;
    private constructor(creator : ForumUser, dataObject : any, name : string, identifier : string) {
        this.creator = creator;
        this.dataObject = dataObject;
        this.name = name;
        this.identifier = identifier;
    }
    static createInstance(creator : ForumUser, dataObject : any, name : string, identifier : string) : PostHelper {
        return new PostHelper(creator, dataObject, name, identifier);
    }
}
