import { GameUser } from "../../user_management/model/GameUser.js";

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
   }

   public getUserID(): string{
    return this.userID;
   }

}