import fs from 'fs';
import path from 'path';
import { Challenge } from "./Challenge.js";
export class ChallengeStorage {
    private challengeStorage: Challenge[];

    constructor() {
        this.challengeStorage = [];
        this.loadChallengesFromFile();
    }

    addChallenge(challenge: Challenge) {
        this.challengeStorage.push(challenge);
    }

    public getChallenge(challengeId: number): Challenge | null {
        const foundChallenge = this.challengeStorage.find(challenge => challenge.getChallengeId() === challengeId);
        if (foundChallenge) {
            return foundChallenge;
        }
        else {
            return null;
        }
    }

    public getChallenges() : Challenge[]{
        return this.challengeStorage;
    }

    private loadChallengesFromFile(): void {
        for (let i = 0; i < 10; i++){
            this.challengeStorage.push(new Challenge("test"+ i,i));
        }

    }


}