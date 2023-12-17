////const express = require('express');
import express from 'express';
////const db = require("../database.js");//.cjs
import db from "../database.js";
////const utils = require("../utils.cjs");
import utils from "../utils.js";
////const formidable = require('formidable');
import formidable from 'formidable';
const router = express.Router();

//import {UserManager} from '../model/UserManager.js'
import UserManager from '../model/UserManager.js'
import { User } from '../model/User.js';
//const UserManager = require('../model/UserManager.js');
//const UserManager = import('../model/UserManager.js');
//import UserManager from '../model/UserManager.js';

router.post("/register", async (req: any, res: any, next: any) => {
	////const form = new formidable.IncomingForm();
	const form = formidable();
	const [fields, files] = await form.parse(req); //Modern JavaScript is hell
	if (fields["username"] && fields["username"][0] && fields["password"] && fields["password"][0] && fields["email"] && fields["email"][0]) {
        
        UserManager.createUser(fields["username"][0], fields["email"][0], fields["password"][0]).then((u : any)=>{
            res.redirect("/umm/users/login");
			res.end();
        }).catch((reason : any)=>{
            res.locals.error = reason;
			res.render("register.html", { title: "Registration" });
			console.log(`Register: ${reason}`);
        });
	} else {
		res.locals.error = "One of needed fields was missing";
		res.render("register.html", { title: "Registration" });
		console.log("Register: One of needed fields was missing");
	}
})

router.get("/register", async (req : any, res : any, next : any) => {
	//if ((await checkLogin(req)).logged) {
	if (await isLoggedIn(req)) {
		res.redirect("/");
		res.end();
	}
	else {
		res.render("register.html", { title: "Registration" });
	}
})

router.get("/login", async (req : any, res : any, next : any) => {
    console.log("ROUTER LOGIN"); //
	//if ((await checkLogin(req)).logged) {
	if (await isLoggedIn(req)) {
		res.redirect("/");
		res.end();
	}
	else {
		res.render("login.html", { title: "Login" });
	}
})

router.get("/logout", async (req : any, res : any, next : any) => {
	/*const instance = await db.LoginInstance.findByPk(req.cookies["login_id"]);
	if (instance) {
		await instance.destroy();
	}
	res.clearCookie("login_id");
	res.redirect("/umm/users/login");
	res.end();*/

	if (await isLoggedIn(req)) {
		await UserManager.logout(await UserManager.getUserBySessionKey(req.cookies["login_id"]) as any);
	}

	res.clearCookie("login_id");
	res.redirect("/umm/users/login");
	res.end();
})

router.post("/login", async (req : any, res : any, next : any) => {
	////const form = new formidable.IncomingForm();
	const form = formidable();
	const [fields, files] = await form.parse(req);
	if (fields["username"] && fields["username"][0] && fields["password"] && fields["password"][0]) {
		//const user = await db.Person.findByPk(fields["username"][0]);
        //const user : any = await db.Person.findOne({where: {username: fields["username"][0]}});
		UserManager.login(fields["username"][0], fields["password"][0])
		.then((loggedInUser : User) => {
			res.cookie("login_id", loggedInUser.getSessionId(), {
				maxAge: 86400000 // one day
			});
			res.redirect("/");
			res.end();
		})
		.catch((e : Error) => {
			res.locals.error = e.message;
			res.render("login.html", { title: "Login" });
		});



		/*if (user) {
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
		} */
	} else {
		res.locals.error = "One of needed fields was missing";
		res.render("login.html", { title: "Login" });
		console.log("Login: One of needed fields was missing");
	}
})



/*//
//  @param {express.Request} req 
//
async function checkLogin(req : any) {
	return new Promise<any>(async (resolve : any ,reject : any) => {
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
}*/

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
	//if((await checkLogin(req)).logged) {
	if (await isLoggedIn(req)) {
		next();
	}
	else {
		res.redirect("/umm/users/login");
		res.end();
	}
}

/*module.exports = {
	router: router,
	loginGuard: loginGuard,
	checkLogin: checkLogin,
	checkLoginSynchronous: checkLoginSynchronous
};*/

export default {
	router: router,
	loginGuard: loginGuard,
	//checkLogin: checkLogin,
	checkLogin: isLoggedIn
	//checkLoginSynchronous: checkLoginSynchronous
}