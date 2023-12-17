/**
 * Interface representing operations interface for a forum browsing user actor for the system
 * The objects are synchronized with the database, as the class acts as a database DAO with restricted write access
 */
export interface ForumUser {
    getUsername() : Promise<string>,
    getEmail() : string,
    getId() : string,
    hasContributedToForum() : boolean
}