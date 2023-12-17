/*
    YOU CAN SAFELY DELETE THIS FILE - IT IS ONLY FOR DEMONSTRATION PURPOUSE
*/

/*
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
 */


import { User } from "./User.js";
import { Leaderboard } from "./LeaderBoard.js";

const leaderboard = new Leaderboard();


const user1 = new User("John", 100, "abc");
const user2 = new User("Jane", 150, "bcd");
const user3 = new User("Bob", 120, "cde");
const user4 = new User("Adam", 130,"def");
leaderboard.addUser(user1);
leaderboard.addUser(user2);
leaderboard.addUser(user3);

const ranking = leaderboard.getRanking();
console.log("Ranking:", ranking);


leaderboard.addUser(user4);
const rankingAddUser = leaderboard.getRanking();
console.log("Ranking (add user):", rankingAddUser);


leaderboard.hideUser(user4)
const rankingHideUser = leaderboard.getRanking();
console.log("Ranking (hide user):", rankingHideUser);

leaderboard.showUser(user4)
const rankingShowUser = leaderboard.getRanking();
console.log("Ranking (show user):", rankingShowUser);

leaderboard.removeUser(user4);
const rankingRemoveUser = leaderboard.getRanking();
console.log("Ranking (show user):", rankingRemoveUser);

