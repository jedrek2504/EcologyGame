/*
    YOU CAN SAFELY DELETE THIS FILE - IT IS ONLY FOR DEMONSTRATION PURPOSE
*/

import {ForumPost} from "./model/ForumPost.js";
import {PostList} from './model/PostList.js';
import {ForumUser} from "../user_management/model/ForumUser.js";

// Mock implementation of ForumUser for demonstration
class MockForumUser implements ForumUser {
    getUsername() {
        return "testUser";
    }

    getEmail() {
        return "test@example.com";
    }

    getId() {
        return "1";
    }

    hasContributedToForum() {
        return true;
    }
}

// Demonstration
const author = new MockForumUser();
const newPost = new ForumPost("123", "Interesting Topic", "This is the content of the post.", author, new Date());
const postList = new PostList();
postList.addPost(newPost);

console.log(`Post Created: Title - ${newPost.getTitle()}, Content - ${newPost.getContent()}, Author - ${newPost.getAuthor().getUsername()}, Timestamp - ${newPost.getTimestamp()}`);
console.log(`Post added to the list. Total posts: ${postList.getPosts().length}`);

// Additional posts for demonstration
const additionalPost = new ForumPost("124", "Another Topic", "More content.", author, new Date("2023-05-15"));
postList.addPost(additionalPost);

const filteredPosts = postList.filterPostsByTitle("Interesting Topic");
console.log(`Filtered Posts by Title: ${filteredPosts.map(post => post.getTitle()).join(", ")}`);

const startDate = new Date("2023-01-01");
const endDate = new Date("2023-12-31");
const postsInYear = postList.filterPostsByDate(startDate, endDate);
console.log(`Posts in 2023: ${postsInYear.map(post => `${post.getTitle()} on ${post.getTimestamp().toLocaleDateString()}`).join(", ")}`);
