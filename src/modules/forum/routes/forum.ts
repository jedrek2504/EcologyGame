/* forum/routes/forum.ts */
import express from 'express';

const router = express.Router();

router.get('/', function(req, res) {
    res.render('forum.html', { title: 'Express' });
});

export default {
    router: router
};
