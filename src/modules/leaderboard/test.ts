/* 
    YOU CAN SAFELY DELETE THIS FILE - IT IS ONLY FOR DEMONSTRATION PURPOUSE
*/


import { IntermoduleUserManager } from "../user_management/model/IntermoduleUserManager.js";
import UMM from "../user_management/exports/api.js"
import { LeaderboardUser } from "../user_management/model/LeaderboardUser.js";

class TTT {
    private ummUserManager : IntermoduleUserManager;
    constructor() {
        this.ummUserManager = UMM.IntermoduleCommons.IntermoduleUserManager;
        let myFavouriteUsers : LeaderboardUser[] = this.ummUserManager.getUsers((user : LeaderboardUser) => user.getScore() > 10);
        this.doSomething(myFavouriteUsers);
        // ...
    }
    // ...
    private doSomething(users : LeaderboardUser[]) {

    }   
}