import { LeaderboardUser } from "./LeaderboardUser.js"

/**
 * Interface representing operations interface for a user(player) actor for the system
 * The objects are synchronized with the database, as the class acts as a database DAO with restricted write access
 */
export interface GameUser extends LeaderboardUser {
    setScore(score : number) : Promise<void>;
}