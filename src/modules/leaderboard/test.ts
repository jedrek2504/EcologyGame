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
        this.ummUserManager.getUsers((user : LeaderboardUser) => user.getScore() > 10)
        .then((myFavouriteUsers : LeaderboardUser[]) => {
            this.doSomething(myFavouriteUsers);
            //...
        });
        // ...
    }
    // ...
    private doSomething(users : LeaderboardUser[]) {

    }
}
 */

import { IntermoduleUserManager } from "../user_management/model/IntermoduleUserManager.js";
import UMM from "../user_management/exports/api.js"
import { LeaderboardUser } from "../user_management/model/LeaderboardUser.js";
import { User } from "./User.js";
import { Leaderboard } from "./LeaderBoard.js";
import { LeaderboardManager } from "./LeaderBoardManager.js";
const ummUserManager = UMM.IntermoduleCommons.IntermoduleUserManager;
const ummNotificationManager = UMM.IntermoduleCommons.IntermoduleNotificationManager;
const leaderboard = new Leaderboard();
const leaderboardManager = new LeaderboardManager(ummUserManager, ummNotificationManager, leaderboard);

const user1 = new User("John", 100, "abc");
const user2 = new User("Jane", 150, "bcd");
const user3 = new User("Bob", 120, "cde");
const user4 = new User("Adam", 130,"def");
leaderboardManager.addUser(user1);
leaderboardManager.addUser(user2);
leaderboardManager.addUser(user3);

const ranking = leaderboard.getRanking();
console.log("Ranking:", ranking);


leaderboard.addUser(user4);
const rankingAddUser = leaderboard.getRanking();
console.log("Ranking (add user):", rankingAddUser);


leaderboard.hideUser(user4)
const rankingHideUser = leaderboard.getRanking();
console.log(user4);
console.log("Ranking (hide user):", rankingHideUser);

leaderboard.showUser(user4)
const rankingShowUser = leaderboard.getRanking();
console.log("Ranking (show user):", rankingShowUser);

leaderboardManager.removeUser(user4);
const rankingRemoveUser = leaderboard.getRanking();
console.log("Ranking (show user):", rankingRemoveUser);

function getTopUsers(): Promise<LeaderboardUser[]> {
    return ummUserManager.getUsers((user: LeaderboardUser) => true);
}
let topUsersExport: LeaderboardUser[] = [];
async function loadTopUsers(): Promise<void> {
    try {
        const topUsers = await getTopUsers();
        topUsersExport = topUsers;
        console.log("Top Users:", topUsers);
    } catch (e) {
        console.error(`UMM error:`);
    }
}
loadTopUsers();
export { topUsersExport, loadTopUsers };
/*getTopUsers()
.then((topUsers : LeaderboardUser[])=>{
    console.log("Top Users:", topUsers);
}).catch((e)=>{
    console.error(`UMM error: ${e.message}`);
})
 */