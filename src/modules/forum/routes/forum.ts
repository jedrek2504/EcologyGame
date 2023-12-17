import express from 'express';
import UMM from "../../user_management/exports/api.js"
import { ForumUser } from "../../user_management/model/ForumUser.js";

const router = express.Router();

router.get('/', async function (req, res) {
    try {
        // Authenticate and get the user
        let user: ForumUser = <ForumUser>await UMM.IntermoduleCommons.IntermoduleUserManager.getUserBySessionKey(req.cookies["login_id"]);

        if (!user) {
            // Handle unauthenticated user
            return res.redirect('/login');
        }

        // Get forum posts for the user
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

export default {
    router: router
};
