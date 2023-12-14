# User management API documentation
All the interfaces shown at the [class diagram](/docs/UMM.pdf) are available through the [exports/api.ts](/src/modules/user_management/exports/api.ts) UMM API access file 

Example on how to use the UMM API as the Leaderboard module:
```ts
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
```

In a similar way other modules can access the API file
