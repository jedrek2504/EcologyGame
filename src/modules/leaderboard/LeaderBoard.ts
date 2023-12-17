import {User} from "./User.js";

export class Leaderboard {
    private board: User[];

    constructor() {
        this.board = [];
    }

    public addUser(user: User): void {
        this.board.push(user);
        this.sortUsersByScore();
    }

    public removeUser(user: User): void {
        this.board = this.board.filter(u => u !== user);
    }

    public getRanking(): User[] {
        /*return this.board
            .filter(user => !user.getScoreHidden())
            .sort((a, b) => b.getScore() - a.getScore()); */ // Do poprawy
        return []; // for now
    }

    public sortUsersByScore(): void {
        //this.board.sort((a, b) => b.getScore() - a.getScore()); //Do poprawy
    }

    public hideUser(user: User): void {
        user.hide();
    }

    public showUser(user: User): void {
        user.show();
    }

}
