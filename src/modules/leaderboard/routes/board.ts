
import express from 'express';
const router = express.Router();
import {topUsersExport as top, loadTopUsers} from "../test.js";

router.get('/leaderboard', (req, res) => {
	/*
		EJS by się nie załączył
		res.sendFile('leaderboard.html', { root: './public' });
	*/
    res.render('leaderboard.html', { title: 'Leaderboard' });
});

router.get('/json/leaderboard', async (req, res) => {
	const returnable = [];
	await loadTopUsers(); //bez tego lista użytkowników do demonstracji się nie zaktualizuje
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
