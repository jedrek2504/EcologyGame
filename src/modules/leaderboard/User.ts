import { LeaderboardUser } from "../user_management/model/LeaderboardUser.js";

export class User implements LeaderboardUser {
    private username: string;
    private score: number;
    private id: string;
    private scoreHidden: boolean;

    constructor(username: string, score: number, id: string) {
        this.username = username;
        this.score = score;
        this.id = id;
        this.scoreHidden = false;
    }

    public getUsername(): string {
        return this.username;
    }

    public getScore(): number {
        return this.score;
    }

    public getId(): string {
        return this.id;
    }

    public getScoreHidden(): boolean {
        return this.scoreHidden;
    }

    public setScoreHidden(hidden: boolean): void {
        this.scoreHidden = hidden;
    }

    // Additional methods for User class

    // Example method to hide the score
    public hide(): void {
        this.setScoreHidden(true);
    }

    // Example method to show the score
    public show(): void {
        this.setScoreHidden(false);
    }


    // Example method to get the registration date
    //public getRegistrationDate(): DateTime {
        // Implement logic to get registration date
    //}
}

export default {
    user: User
}