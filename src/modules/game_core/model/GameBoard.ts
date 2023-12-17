import { ChallengeStorage } from "./ChallengeStorage.js";
import { DailyTask } from "./DailyTask.js";

export class GameBoard{
    private progress : number;
    private dailyTasks: DailyTask[] = [];
    private winStreak : number;

    constructor(progress: number, winStreak: number){
        this.progress = progress;
        this.winStreak = winStreak;
        for (let i = 0; i < 5; i++) {
            this.dailyTasks.push(new DailyTask(i,false,false,new Date(),new ChallengeStorage(),"1"));
          }
    }

    public getProgress(): number{
        return this.progress;
    }

    public updateProgress(){
        var numberOfTasks = 0;
        var numberOfTasksDone = 0;
        for(const dailyTask of this.dailyTasks){
            numberOfTasks++;
            if(dailyTask.checkIsCompleted()){
                numberOfTasksDone++;
            }
        }
        this.progress = numberOfTasksDone/numberOfTasks * 100;
    }

    
}