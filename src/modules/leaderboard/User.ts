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

    public getScore(): Promise<Number> {
        //return this.score; /* DO ZMIANY */
        /* BTW nie musicie implementować interfejsu LeaderboardUser */
        return new Promise<Number>((resolve, reject) => {
            return 0; //for now
        });
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

    public hide(): void {
        this.setScoreHidden(true);
    }

    public show(): void {
        this.setScoreHidden(false);
    }

}

export default {
    user: User
}