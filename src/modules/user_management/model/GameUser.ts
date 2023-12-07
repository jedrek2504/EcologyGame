import { LeaderboardUser } from "./LeaderboardUser.js"
export interface GameUser extends LeaderboardUser {
    setScore(score : number) : boolean
}