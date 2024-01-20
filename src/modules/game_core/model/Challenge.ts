
export class Challenge {
    private description: String;
    private challengeId: Number;
    private isDone: Boolean;

    constructor(description: String, challengeId: Number) {
        this.challengeId = challengeId;
        this.description = description;
        this.isDone = false;
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

    public getIsDone(): Boolean {
        return this.isDone;
    }

    public setIsDone(value: number){
        if(value == 1){
            this.isDone = true
        }else 
        {
            this.isDone = false;
        }
    }


}