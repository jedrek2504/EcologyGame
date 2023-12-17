
export class Challenge {
    private description: String;
    private challengeId: Number;

    constructor(description: String, challengeId: Number) {
        this.challengeId = challengeId;
        this.description = description;
    }

    public getDescription(): String {
        return this.description;
    }

    public setDescription(description: String) {
        this.description = description;
    }

    public getChallengeId(): Number {
        return this.challengeId;
    }


}