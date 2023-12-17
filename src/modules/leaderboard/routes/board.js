import express from 'express';
const router = express.Router();
router.get('/leaderboard', (req, res) => {
    res.sendFile('leaderboard.html', { root: './public' });
});
export default {
    router: router,
};
