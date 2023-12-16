/* forum/model/PostList.ts */

import { ForumPost } from "./ForumPost";

export class PostList {
    private posts: ForumPost[];

    constructor() {
        this.posts = [];
    }

    public addPost(post: ForumPost): boolean {
        this.posts.push(post);
        return true;
    }

    public removePost(post: ForumPost): boolean {
        const index = this.posts.indexOf(post);
        if (index > -1) {
            this.posts.splice(index, 1);
            return true;
        }
        return false;
    }

    public getPosts(): ForumPost[] {
        return this.posts;
    }

    public filterPostsByTitle(title: string): ForumPost[] {
        return this.posts.filter(post => post.getTitle() === title);
    }

    public filterPostsByDate(startDate: Date, endDate: Date): ForumPost[] {
        return this.posts.filter(post => post.getTimestamp() >= startDate && post.getTimestamp() <= endDate);
    }
}
