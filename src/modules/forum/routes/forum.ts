import express from 'express';
import UMM from "../../user_management/exports/api.js"
import { ForumUser } from "../../user_management/model/ForumUser.js";
import FM from "../model/ForumModule.js";
import {ForumPost} from "../model/ForumPost.js";

const router = express.Router();

router.get('/', async function (req, res) {
    try {
        // Authenticate and get the user
        let user: ForumUser = <ForumUser>await UMM.IntermoduleCommons.IntermoduleUserManager.getUserBySessionKey(req.cookies["login_id"]);

        if (!user) {
            // Handle unauthenticated user
            return res.redirect('/login');
        }

        // todo - to powinno byc wyswietlane przez odpowiednia metode postList z naszego modulu
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
        const id = "1"; /* todo - Generate a unique ID for the post */
        const forumPost = new ForumPost(id, title, content, user);
        const postCreated = await FM.addPost(user, forumPost);

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

// Route to handle post removal
router.post('/delete', async (req, res) => {
    try {
        const user: ForumUser = <ForumUser>await UMM.IntermoduleCommons.IntermoduleUserManager.getUserBySessionKey(req.cookies["login_id"]);
        if (!user) {
            return res.status(401).send('Unauthorized');
        }

        const { postId } = req.body;
        // Assuming ForumPost can be identified by postId
        const forumPost = FM.getPostById(postId);
        if (!forumPost) {
            return res.status(404).send('Post not found');
        }
        const postRemoved = await FM.removePost(user, forumPost);

        if (postRemoved) {
            res.redirect('/forum');
        } else {
            res.status(500).send('Failed to remove post');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to display a specific post
router.get('/post/:postId', async (req, res) => {
    try {
        const user: ForumUser = <ForumUser>await UMM.IntermoduleCommons.IntermoduleUserManager.getUserBySessionKey(req.cookies["login_id"]);
        if (!user) {
            return res.status(401).send('Unauthorized');
        }

        const { postId } = req.params;

        const post = FM.getPostById(postId);

        if (!post) {
            return res.status(404).send('Post not found');
        }

        // Render a page to display the post
        res.render('post.html', {
            title: post.getName(),
            post: post,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

export default {
    router: router
};
