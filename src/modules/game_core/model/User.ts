import { GameUser } from "../../user_management/model/GameUser.js";

export class User{
   private gameUser :GameUser;
   private score: Number = 0;
   private userID: string = '';

   constructor(gameUser: GameUser){
    this.gameUser = gameUser;
    //this.userID = gameUser.getUsername(); // DO ZMIANY
    throw new Error("DO ZMIANY");


    //this.score = gameUser.getScore(); DO ZMIANY
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