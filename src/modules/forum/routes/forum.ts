/* forum/routes/forum.ts */
import express from 'express';
import UMM from "../../user_management/exports/api.js"
import {ForumUser} from "../../user_management/model/ForumUser.js";

const router = express.Router();

router.get('/', async function (req, res) {
    let user: ForumUser = <ForumUser>await UMM.IntermoduleCommons.IntermoduleUserManager.getUserBySessionKey(req.cookies["login_id"]) // important

    res.render('forum.html', {title: 'Express'});
});

export default {
    router: router
};
