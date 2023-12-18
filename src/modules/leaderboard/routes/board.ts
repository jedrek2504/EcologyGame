
import express from 'express';
const router = express.Router();
import {topUsersExport as top} from "../test.js";

router.get('/leaderboard', (req, res) => {
    res.sendFile('leaderboard.html', { root: './public' });
});

router.get('/json/leaderboard', async (req, res) => {
	const returnable = [];

	for (const user of top) {
		const newUser: any = user;
		newUser.dbUser = {
			username: await user.getUsername(),
			score: await user.getScore(),
		};
	}

	res.json(top);
});

export default {
    router: router,
}
