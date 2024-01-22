/* forum/model/ForumModule.ts */

import {ForumUser} from "../../user_management/model/ForumUser.js";
import {ForumPost} from "./ForumPost.js";
import {PostList} from "./PostList.js";
import UMM from "../../user_management/exports/api.js";
import {UserNotification} from "../../user_management/model/UserNotification.js";
import {IntermoduleNotificationManager} from "../../user_management/model/IntermoduleNotificationManager.js";
import {IntermoduleUserManager} from "../../user_management/model/IntermoduleUserManager.js";
import {ForumMediator} from "../../user_management/model/ForumMediator.js";

class ForumModule {
    private static instance: ForumModule;
    private _postList: PostList;
    private readonly _forumMediator: ForumMediator;
    private readonly _notificationManager: IntermoduleNotificationManager;
    private readonly _userManager: IntermoduleUserManager;

    private constructor() {
        this._postList = new PostList();
        this._forumMediator = UMM.ForumMediator;
        this._notificationManager = UMM.IntermoduleCommons.IntermoduleNotificationManager;
        this._userManager = UMM.IntermoduleCommons.IntermoduleUserManager;

        // postList is empty after boot
        // pray to all gods that other parts of booting will take long enough
        this._userManager.getUsers((_) => true).then((users) => {
            users.forEach((user) => {
                this._forumMediator.postList(user).then((posts) => {
                    posts.forEach((post) => {
                        this._postList.addPost(new ForumPost(post.getIdentifier(), post.getDataObject().title, post.getDataObject().content, user));
                    })
                });
            })
        });
    }

    public static getInstance(): ForumModule {
        if (!ForumModule.instance) {
            ForumModule.instance = new ForumModule();
        }
        return ForumModule.instance;
    }

    public async addPost(user: ForumUser, post: ForumPost): Promise<boolean> {
        try {
            const succeeded = await this._forumMediator.registerPost(user, post);
            if (succeeded) {
                this._postList.addPost(post);
                const notification = new UserNotification();
                notification.setTitle("New Forum Post");
                notification.setMessage(`A new post titled '${post.getName()}' has been added.`);
                this._notificationManager.notifyUser(user.getId(), notification);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error in addPost:', error);
            return false;
        }
    }

    public async removePost(user: ForumUser, post: ForumPost): Promise<boolean> {
        try {
            const succeeded = await this._forumMediator.unregisterPost(user, post);
            if (succeeded) {
                return this._postList.removePost(post);
            }
            return false;
        } catch (error) {
            console.error('Error in removePost:', error);
            return false;
        }
    }

    /**
     * @note This method is asynchronous => it returns a promise
     * @param user 
     * @param message 
     * @returns Promise that resolves when the notification has been sent
     */
    public async sendNotification(user: ForumUser, message: string) {
        const notification = new UserNotification();
        notification.setTitle("Forum Notification");
        notification.setMessage(message);
        return this._notificationManager.notifyUser(user.getId(), notification);
    }

    // public manageUser(filtrator: (user: ForumUser) => boolean): ForumUser[] {
    //     return this.userManager.getUsers(filtrator);
    // }

    public getPostById(postId: string): ForumPost | undefined {
        return this._postList.getPostById(postId);
    }

    public filterPosts(filterType: string, filterValue: string): ForumPost[] {
        if (filterType === "title") {
            return this._postList.filterPostsByTitle(filterValue);
        } else if (filterType === "date") {
            const [startDate, endDate] = filterValue.split(":").map(dateStr => new Date(dateStr));
            return this._postList.filterPostsByDate(startDate, endDate);
        } else {
            return [];
        }
    }

    // Getters
    get forumMediator(): ForumMediator {
        return this._forumMediator;
    }

    get postList(): PostList {
        return this._postList;
    }

    get notificationManager(): IntermoduleNotificationManager {
        return this._notificationManager;
    }

    get userManager(): IntermoduleUserManager {
        return this._userManager;
    }
}

export default ForumModule.getInstance();
