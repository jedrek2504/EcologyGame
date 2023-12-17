/**
 * Interface representing operations interface for a leaderboard interacting user actor for the system
 * The objects are synchronized with the database, as the class acts as a database DAO with restricted write access
 */
export interface LeaderboardUser {
    getUsername() : Promise<string>,
    getScore() : Promise<Number>,
    getId() : string
}