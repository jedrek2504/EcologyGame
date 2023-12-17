
import express from 'express';
const router = express.Router();
import {topUsersExport as top} from "../test.js";

router.get('/leaderboard', (req, res) => {
    res.sendFile('leaderboard.html', { root: './public' });
});

router.get('/json/leaderboard', (req, res) => {
   res.json(top);
});

export default {
    router: router,
}
