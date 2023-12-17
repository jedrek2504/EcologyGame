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
        try {
            const filePath = path.resolve(__dirname, 'challenges.json'); 
            const challengesData = fs.readFileSync(filePath, 'utf-8'); 
            const parsedChallenges: Challenge[] = JSON.parse(challengesData);
            this.challengeStorage = parsedChallenges;
        } catch (error) {
            console.error('Błąd podczas wczytywania wyzwań z pliku:', error);
        }
    }


}