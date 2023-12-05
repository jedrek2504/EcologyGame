const express = require('express');
const db = require("../database.js");
const utils = require("../utils.js");
const formidable = require('formidable');

const router = express.Router();

router.post("/register", async (req, res, next) => {
	const form = new formidable.IncomingForm();
	const [fields, files] = await form.parse(req); //Modern JavaScript is hell
	if (fields["username"] && fields["username"][0] && fields["password"] && fields["password"][0] && fields["email"] && fields["email"][0]) {
		// if (await db.Person.findByPk(fields["username"][0])) {
        if (await db.Person.findOne({where: {username: fields["username"][0]}})) {
            res.locals.error = "Trying to create existing user";
			res.render("register.html", { title: "Registration" });
			console.log("Register: Trying to create existing user");
        }
        else if (await db.Person.findOne({where: {email: fields["email"][0]}})) {
            res.locals.error = "Email is already taken";
            res.render("register.html", { title: "Registration" });
			console.log("Register: Trying to reuse an email address");
        }
        else {
			db.Person.create({
				username: fields["username"][0],
				password: fields["password"][0],
                email: fields["email"][0]
			});
			res.redirect("/umm/users/login");
			res.end();//
		}
	} else {
		res.locals.error = "One of needed fields was missing";
		res.render("register.html", { title: "Registration" });
		console.log("Register: One of needed fields was missing");
	}
})

router.get("/register", async (req, res, next) => {
	if ((await checkLogin(req)).logged) {
		res.redirect("/");
		res.end();
	}
	else {
		res.render("register.html", { title: "Registration" });
	}
})

router.get("/login", async (req, res, next) => {
    console.log("ROUTER LOGIN"); //
	if ((await checkLogin(req)).logged) {
		res.redirect("/");
		res.end();
	}
	else {
		res.render("login.html", { title: "Login" });
	}
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
		//const user = await db.Person.findByPk(fields["username"][0]);
        const user = await db.Person.findOne({where: {username: fields["username"][0]}});
		if (user) {
			if (user.password == fields["password"][0]) {
				let generatedId;
				do {
					generatedId = utils.makeid(32);
				} while (await db.LoginInstance.findByPk(generatedId));
				await db.LoginInstance.destroy({
					where: {
					  //user: user.username
                      user_id: user.user_id
					}
				  });
				await db.LoginInstance.create({
					login_id: generatedId,
					//user: user.username,
                    user_id: user.user_id
				});
				res.cookie("login_id", generatedId, {
					maxAge: 86400000 // one day
				});
				res.redirect("/");
				res.end();
			} else {
				res.locals.error = "Incorrect password!";
				res.render("login.html", { title: "Login" });
				console.log(`Incorrect user password for ${user.username}`);
			}
		} else {
			res.locals.error = `Username "${fields['username']}" does not exist!`;
			res.render("login.html", { title: "Login" });
			console.log(`User "${fields['username']}" does not exist`);
		}
	} else {
		res.locals.error = "One of needed fields was missing";
		res.render("login.html", { title: "Login" });
		console.log("Login: One of needed fields was missing");
	}
})



/**
 *  @param {express.Request} req 
 */
async function checkLogin(req) {
	return new Promise(async (resolve,reject) => {
		if (req.cookies["login_id"]) {
			const id = req.cookies["login_id"];
            console.log("BEFORE findByPk"); //
			const login = await db.LoginInstance.findByPk(id);
            console.log("AFTER findByPk"); // 
            console.log()
			if (login) {
				resolve({ logged: true });
			}
			else {
				resolve({ logged: false });
			}
		}
		else {
			resolve({ logged: false });
		}
	});
}

/**
 *  @param {express.Request} req 
 */
async function checkLoginSynchronous(req) {
	return await checkLogin(req);
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
async function loginGuard(req, res, next) {
	if((await checkLogin(req)).logged) {
		next();
	}
	else {
		res.redirect("/umm/users/login");
		res.end();
	}
}

module.exports = {
	router: router,
	loginGuard: loginGuard,
	checkLogin: checkLogin,
	checkLoginSynchronous: checkLoginSynchronous
};