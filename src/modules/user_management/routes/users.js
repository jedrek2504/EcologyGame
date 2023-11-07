const express = require('express');
const db = require("../database.js");
const utils = require("../utils.js");
const formidable = require('formidable');

const router = express.Router();

router.post("/register", async (req, res, next) => {
	const form = new formidable.IncomingForm();
	const [fields, files] = await form.parse(req); //Modern JavaScript is hell
	if (fields["username"] && fields["username"][0] && fields["password"] && fields["password"][0]) {
		if (!await db.Person.findByPk(fields["username"][0])) {
			db.Person.create({
				username: fields["username"][0],
				password: fields["password"][0],
			});
			res.redirect("/users/login");
		} else {
			res.redirect("/users/register");
			console.log("Trying to create existing user");
		}
	} else {
		res.redirect("/users/register");
		console.log("Register: One of needed fields was missing");
	}
	res.end();
})

router.get("/register", (req, res, next) => {
	res.render("register.html", { title: "Registration" });
})

router.get("/login", (req, res, next) => {
	res.render("login.html", { title: "Registration" });
})

router.get("/logout", async (req, res, next) => {
	const instance = await db.LoginInstance.findByPk(req.cookies["login_id"]);
	if (instance) {
		await instance.destroy();
	}
	res.clearCookie("login_id");
	res.redirect("/umm/users/login");
	res.end();
})

router.post("/login", async (req, res, next) => {
	const form = new formidable.IncomingForm();
	const [fields, files] = await form.parse(req);
	if (fields["username"] && fields["username"][0] && fields["password"] && fields["password"][0]) {
		const user = await db.Person.findByPk(fields["username"][0]);
		if (user) {
			if (user.password == fields["password"][0]) {
				let generatedId;
				do {
					generatedId = utils.makeid(32);
				} while (await db.LoginInstance.findByPk(generatedId));
				await db.LoginInstance.create({
					login_id: generatedId,
					user: user.username,
				});
				res.cookie("login_id", generatedId, {
					maxAge: 86400000 // one day
				});
				res.redirect("/");
			} else {
				res.redirect("/umm/users/login");
				console.log(`Incorrect user password for {user.username}`);
			}
		} else {
			res.redirect("/umm/users/register");
			console.log("Trying to create existing user");
		}
	} else {
		res.redirect("/umm/users/login");
		console.log("Login: One of needed fields was missing");
	}
	res.end();
})

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
async function checkLogin(req, res, next) {
	if (req.cookies["login_id"]) {
		const id = req.cookies["login_id"];
		const login = await db.LoginInstance.findByPk(id);
		if (!login) {
			res.redirect("/umm/users/login");
			res.end();
		} else {
			next();
		}
		return
	}
	res.redirect("/umm/users/login");
	res.end();
}

module.exports = {
	router: router,
	checkLogin: checkLogin
};