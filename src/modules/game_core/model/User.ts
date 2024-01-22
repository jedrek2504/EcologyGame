import { GameUser } from "../../user_management/model/GameUser.js";
import { UserNotification } from "../../user_management/model/UserNotification.js";
import UMM from '../../user_management/exports/api.js';

export class User{
   private gameUser :GameUser;
   private score: Number = 0;
   private userID: string = '';

   constructor(gameUser: GameUser,score: number,userID: string){
    this.gameUser = gameUser;
    this.score = score;
    this.userID = userID;
   }

   public getScore(score: Number){
    return this.score;
   }

   public setScore(score : Number){
    this.score = score;
    if (score == 100) {
      this.notifyUserAsReward(this.gameUser);
    }
   }

   public getUserID(): string{
    return this.userID;
   }

   private notifyUserAsReward(gameUser: GameUser) {
      let notification = new UserNotification();
      notification.setTitle("Wow!");
      notification.setMessage("Congratulations! You have reached 100 points!");
      UMM.IntermoduleCommons.IntermoduleNotificationManager.notifyUser(gameUser.getId(), notification).then(async()=>{
            console.log(`Sent congratulations to ${await gameUser.getUsername()}(#${gameUser.getId()})`);
      }).catch(async (error:any)=>{
            console.log(`Failed to send congratulations to ${await gameUser.getUsername()}(#${gameUser.getId()}): ${error}`);
      });
   }

}