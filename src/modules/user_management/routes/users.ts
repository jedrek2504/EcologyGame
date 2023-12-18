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
	if (req.body.username && req.body.password && req.body.email) {
        
		try {
        	const user = await UserManager.createUser(req.body.username, req.body.email, req.body.password);
            res.redirect("/umm/users/login");
			res.end();
		} catch (reason) {
            res.locals.error = reason;
			res.render("register.html", { title: "Registration" });
			console.log(`Register: ${reason}`);
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
    console.log("ROUTER LOGIN"); //
	if (await isLoggedIn(req)) {
		res.redirect("/");
		res.end();
	}
	else {
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
	if (req.body.username && req.body.password) {
        const user : any = await db.Person.findOne({where: {username: req.body.username}});
		if (user) {
			console.log("FOUNDFOUND")
			if (user.password == req.body.password) {
				let generatedId;
				do {
					generatedId = utils.makeid(32);
				} while (await db.LoginInstance.findByPk(generatedId));
				await db.LoginInstance.destroy({
					where: {
                      user_id: user.user_id
					}
				  });
				await db.LoginInstance.create({
					login_id: generatedId,
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
			res.locals.error = `Username "${req.body.username}" does not exist!`;
			res.render("login.html", { title: "Login" });
			console.log(`User "${req.body.username}" does not exist`);
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

export default {
	router: router,
	loginGuard: loginGuard,
	checkLogin: isLoggedIn
}