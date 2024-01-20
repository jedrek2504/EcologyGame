import fs from 'fs';
import { Challenge } from './Challenge.js';

export class ChallengeStorage {
    private challengeStorage: Challenge[];

    constructor() {
        this.challengeStorage = [];
    }

    addChallenge(challenge: Challenge) {
        this.challengeStorage.push(challenge);
    }

    public getChallenge(challengeId: number): Challenge | null {
        const foundChallenge = this.challengeStorage.find(challenge => challenge.getChallengeId() === challengeId);
        return foundChallenge ?? null;
    }

    public getChallenges(): Challenge[] {
        return this.challengeStorage;
    }

    private async loadChallengesFromFile(): Promise<void> {
        try {
            const filePath = 'data/challenges.json';
    
            const fileContent = await fs.promises.readFile(filePath, 'utf-8');
            const jsonData = JSON.parse(fileContent);
    
            for (let i = 0; i < jsonData.length; i++) {
                const data = jsonData[i];
                this.challengeStorage.push(new Challenge(data.description, data.challengeId));
            }
            console.log("challenges loaded successfully");
        } catch (error) {
            console.error('Error reading challenges file:', error);
            throw error; 
        }
    }

    public async initialize(): Promise<void> {
        await this.loadChallengesFromFile();
    }
}
