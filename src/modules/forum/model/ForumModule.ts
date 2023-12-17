/* forum/model/ForumModule.ts */

import {ForumUser} from "../../user_management/model/ForumUser.js";
import {ForumPost} from "./ForumPost.js";
import {PostList} from "./PostList.js";
import UMM from "../../user_management/exports/api.js";
import {UserNotification} from "../../user_management/model/UserNotification.js";
import {IntermoduleNotificationManager} from "../../user_management/model/IntermoduleNotificationManager.js";
import {IntermoduleUserManager} from "../../user_management/model/IntermoduleUserManager.js";
import {ForumMediator} from "../../user_management/model/ForumMediator.js";

export class ForumModule {
    private postList: PostList;
    private forumMediator: ForumMediator;
    private notificationManager: IntermoduleNotificationManager;
    private userManager: IntermoduleUserManager;

    constructor(postList: PostList) {
        this.postList = postList;
        this.forumMediator = UMM.ForumMediator;
        this.notificationManager = UMM.IntermoduleCommons.IntermoduleNotificationManager;
        this.userManager = UMM.IntermoduleCommons.IntermoduleUserManager;
    }

    public addPost(user: ForumUser, post: ForumPost): boolean {
        this.forumMediator.registerPost(user, post).then((succeeded: boolean) => {
            if (succeeded) {
                this.postList.addPost(post);
                const notification = new UserNotification();
                notification.setTitle("New Forum Post");
                notification.setMessage(`A new post titled '${post.getName()}' has been added.`);
                this.notificationManager.notifyUser(user.getId(), notification);
                return true;
            }
        })
        return false;
    }

    public removePost(user: ForumUser, post: ForumPost): boolean {
        this.forumMediator.unregisterPost(user, post).then((succeeded: boolean) => {
            if (succeeded) {
                return this.postList.removePost(post);
            }
        })
        return false;
    }

    public sendNotification(user: ForumUser, message: string): boolean {
        const notification = new UserNotification();
        notification.setTitle("Forum Notification");
        notification.setMessage(message);
        return this.notificationManager.notifyUser(user.getId(), notification);
    }

    public manageUser(filtrator: (user: ForumUser) => boolean): ForumUser[] {
        return this.userManager.getUsers(filtrator);
    }

    public filterPosts(filterType: string, filterValue: string): ForumPost[] {
        if (filterType === "title") {
            return this.postList.filterPostsByTitle(filterValue);
        } else if (filterType === "date") {
            const [startDate, endDate] = filterValue.split(":").map(dateStr => new Date(dateStr));
            return this.postList.filterPostsByDate(startDate, endDate);
        } else {
            return [];
        }
    }
}
