import { GameUser } from "../../user_management/model/GameUser.js";


export class User implements GameUser{

    private userId : String;

    private score : Number;

    constructor(userId : Number, score : Number){
        this.userId = this.getId();
        this.score = this.getScore();
    }



    setScore(score: number): boolean {
        throw new Error("Method not implemented.");
    }
    getUsername(): string {
        throw new Error("Method not implemented.");
    }
    getScore(): number {
        throw new Error("Method not implemented.");
    }
    getId(): string {
        throw new Error("Method not implemented.");
    }

}