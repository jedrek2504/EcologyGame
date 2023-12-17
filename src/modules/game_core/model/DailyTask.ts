import { Challenge } from "./Challenge.js";
import { ChallengeStorage } from "./ChallengeStorage.js";

export class DailyTask {
    private taskId : Number;
    private isCompleted : Boolean;
    private isAvailable : Boolean;
    private completionDate : Date;
    private challenges : Challenge[] = [];
    private userId : String;

    constructor(
        taskId: number,
        isCompleted: boolean,
        isAvailable: boolean,
        completionDate: Date,
        challengeStorage : ChallengeStorage,
        userId: string
    ) {
        this.taskId = taskId;
        this.isCompleted = isCompleted;
        this.isAvailable = isAvailable;
        this.completionDate = completionDate;
        this.getChallengeList(challengeStorage);
        this.userId = userId;
    }

    public checkIsCompleted(): Boolean{
        return this.isCompleted;
    }

    public markAsCompleted(){
        this.isAvailable = true;
    }

    public getTaskId() : Number {
        return this.taskId;
    }

    public getIsAvailable() : Boolean {
        return this.isAvailable
    }

    public setIsAvailable(isAvailable : Boolean) {
        this.isAvailable = isAvailable;
    }

    public getChallengeList(challengeStorage: ChallengeStorage): void {
        const availableChallenges: Challenge[] = challengeStorage.getChallenges();
        const chosenChallenges: Challenge[] = [];
        const maxChallengesToChoose = 3;

        while (chosenChallenges.length < maxChallengesToChoose && availableChallenges.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableChallenges.length);
            const randomChallenge = availableChallenges[randomIndex];

            if (!this.challenges.includes(randomChallenge)) {
                chosenChallenges.push(randomChallenge);
            }

            availableChallenges.splice(randomIndex, 1);
        }

        this.challenges.push(...chosenChallenges);
    }

    public getChallenges(): Challenge[]{
        return this.challenges;
    }
    


}