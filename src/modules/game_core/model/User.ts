import { GameUser } from "../../user_management/model/GameUser.js";

export class User{
   private gameUser :GameUser;
   private score: number = 0;
   private userID: string = '';

   constructor(gameUser: GameUser){
    this.gameUser = gameUser;
    this.userID = gameUser.getUsername();
    this.score = gameUser.getScore();
   }

   public getScore(): number{
    return this.score;
   }

   public setScore(score : number){
    this.score = score;
   }

   public getUserID(): string{
    return this.userID;
   }

}