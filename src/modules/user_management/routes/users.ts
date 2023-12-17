import express from 'express';
import db from "../database.js";
import utils from "../utils.js";
import formidable from 'formidable';
const router = express.Router();

import UserManager from '../model/UserManager.js'

router.post("/register", async (req: any, res: any, next: any) => {
	const form = formidable();
	const [fields, files] = await form.parse(req); //Modern JavaScript is hell
	if (fields["username"] && fields["username"][0] && fields["password"] && fields["password"][0] && fields["email"] && fields["email"][0]) {
		const loggedInUser = await UserManager.createUser(fields["username"][0], fields["email"][0], fields["password"][0])
        if (loggedInUser) {
			res.cookie("login_id", loggedInUser.getSessionId(), {
				maxAge: 86400000 // one day
			});
			res.redirect("/");
		} else {
            res.locals.error = "Could not register";
			res.render("register.html", { title: "Registration" });
			console.log(`Register: Could not register`);
		}
	} else {
		res.locals.error = "One of needed fields was missing";
		res.render("register.html", { title: "Registration" });
		console.log("Register: One of needed fields was missing");
	}
})

router.get("/register", async (req : any, res : any, next : any) => {
	if (await isLoggedIn(req)) {
		res.redirect("/");
		res.end();
	}
	else {
		res.render("register.html", { title: "Registration" });
	}
})

router.get("/login", async (req : any, res : any, next : any) => {
	if (await isLoggedIn(req)) {
		res.redirect("/");
		res.end();
	} else {
		res.render("login.html", { title: "Login" });
	}
})

router.get("/logout", async (req : any, res : any, next : any) => {
	if (await isLoggedIn(req)) {
		await UserManager.logout(await UserManager.getUserBySessionKey(req.cookies["login_id"]) as any);
	}

	res.clearCookie("login_id");
	res.redirect("/umm/users/login");
	res.end();
})

router.post("/login", async (req : any, res : any, next : any) => {
	const form = formidable();
	const [fields, files] = await form.parse(req);
	if (fields["username"] && fields["username"][0] && fields["password"] && fields["password"][0]) {

		const loggedInUser = await UserManager.login(fields["username"][0], fields["password"][0]);
		if (loggedInUser == null) {
			res.locals.error = "Incorrect credentials!";
			res.render("login.html", { title: "Login" });
			return;
		}

		res.cookie("login_id", loggedInUser.getSessionId(), {
			maxAge: 86400000 // one day
		});
		res.redirect("/");
		res.end();
	} else {
		res.locals.error = "One of needed fields was missing";
		res.render("login.html", { title: "Login" });
		console.log("Login: One of needed fields was missing");
	}
})



/**
 *  @param {express.Request} req 
 */
async function isLoggedIn(req : any): Promise<boolean> {
	if (req.cookies["login_id"]) {
		const id = req.cookies["login_id"];
		const login = await UserManager.getUserBySessionKey(id);
		if (login) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
async function loginGuard(req : any, res : any, next : any) {
	if (await isLoggedIn(req)) {
		next();
	} else {
		res.redirect("/umm/users/login");
		res.end();
	}
}

export default {
	router: router,
	loginGuard: loginGuard,
	checkLogin: isLoggedIn,
}