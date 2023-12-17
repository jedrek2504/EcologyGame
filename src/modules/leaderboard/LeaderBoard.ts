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
        return this.board.slice().sort((a, b) => b.getScore() - a.getScore());
    }

    public sortUsersByScore(): void {
        this.board.sort((a, b) => b.getScore() - a.getScore());
    }

    public hideUser(user: User): void {
        user.hide();
    }

    public showUser(user: User): void {
        user.show();
    }

    public deleteEvent(): void {
        this.board = [];
    }
}
