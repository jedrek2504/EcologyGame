import { ChallengeStorage } from "./ChallengeStorage.js";
import { DailyTask } from "./DailyTask.js";

export class GameBoard{
    private progress : number;
    private dailyTasks: DailyTask[] = [];
    private winStreak : number;

    constructor(progress: number, winStreak: number, challengeStorage: ChallengeStorage){
        this.progress = progress;
        this.winStreak = winStreak;
        
        for (let i = 0; i < 5; i++) {
            this.dailyTasks.push(new DailyTask(i,false,false,new Date(),challengeStorage,"1"));
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

    public getTask(taskId: number): DailyTask{
        return this.dailyTasks[taskId];
    }

    public updateTask(taskId: number){
        this.dailyTasks[taskId].markAsCompleted();
    }

    public calculateWinStreak(){
        throw new Error("Not implemented yet");
    }

    
}