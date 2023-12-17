import express from 'express';
import UMM from "../../user_management/exports/api.js"
import { ForumUser } from "../../user_management/model/ForumUser.js";
import {ForumModule} from "../model/ForumModule.js";
import {ForumPost} from "../model/ForumPost.js";
import {PostList} from "../model/PostList.js";

const router = express.Router();
const postList = new PostList()
const forumModule = new ForumModule(postList)
router.get('/', async function (req, res) {
    try {
        // Authenticate and get the user
        let user: ForumUser = <ForumUser>await UMM.IntermoduleCommons.IntermoduleUserManager.getUserBySessionKey(req.cookies["login_id"]);

        if (!user) {
            // Handle unauthenticated user
            return res.redirect('/login');
        }

        // todo - to powinno byc nadpisane przez odpowiednia metode postList z naszego modulu
        const posts = await UMM.ForumMediator.postList(user);

        // Render the forum page with posts
        res.render('forum.html', {
            title: 'Forum',
            posts: posts,
        });
    } catch (error) {
        // Handle errors, such as database connection issues
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to handle new post creation
router.post('/post', async (req, res) => {
    try {
        const user: ForumUser = <ForumUser>await UMM.IntermoduleCommons.IntermoduleUserManager.getUserBySessionKey(req.cookies["login_id"]);
        if (!user) {
            return res.status(401).send('Unauthorized');
        }

        const { title, content } = req.body;
        const forumPost = new ForumPost(title, content, user);
        const postCreated = await forumModule.addPost(user, forumPost);

        if (!postCreated) {
            res.redirect('/forum');
        } else {
            res.status(500).send('Failed to create post');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


export default {
    router: router
};
