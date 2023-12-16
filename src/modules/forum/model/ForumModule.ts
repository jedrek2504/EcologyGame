import { ForumUser } from "../../user_management/model/ForumUser.js";
import { ForumPost } from "./ForumPost";
import { PostList } from "./PostList";
import { ForumMediator } from "../../user_management/model/ForumMediator";
import { IntermoduleNotificationManager } from "../../user_management/model/IntermoduleNotificationManager.js";
import { IntermoduleUserManager } from "../../user_management/model/IntermoduleUserManager.js";
import { UserNotification } from "../../user_management/model/UserNotification.js";

export class ForumModule {
    private postList: PostList;
    private forumMediator: ForumMediator;
    private notificationManager: IntermoduleNotificationManager;
    private userManager: IntermoduleUserManager;

    constructor(postList: PostList, forumMediator: ForumMediator, notificationManager: IntermoduleNotificationManager, userManager: IntermoduleUserManager) {
        this.postList = postList;
        this.forumMediator = forumMediator;
        this.notificationManager = notificationManager;
        this.userManager = userManager;
    }

    public addPost(user: ForumUser, post: ForumPost): boolean {
        if (this.forumMediator.registerPost(user, post)) {
            this.postList.addPost(post);
            // Send notification about new post
            // const notification = new UserNotification();
            // notification.setTitle("New Forum Post");
            // notification.setMessage(`A new post titled '${post.getTitle()}' has been added.`);
            // this.notificationManager.notifyUser(user, notification);
            return true;
        }
        return false;
    }

    public removePost(user: ForumUser, post: ForumPost): boolean {
        if (this.forumMediator.unregisterPost(user, post)) {
            return this.postList.removePost(post);
        }
        return false;
    }

    // public sendNotification(user: ForumUser, message: string): boolean {
    //     const notification = new UserNotification();
    //     notification.setTitle("Forum Notification");
    //     notification.setMessage(message);
    //     return this.notificationManager.notifyUser(user, notification);
    // }

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
