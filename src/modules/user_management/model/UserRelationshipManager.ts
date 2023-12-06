class UserRelationshipManager implements IntermoduleUserRelationshipManager {
    createRelationship(source : User, target : User) : Relationship | null {
        return null;
    }
    deleteRelationship(relationship : Relationship) : boolean {
        return false;
    }
    listUserRelationships(target : User) : Relationship[] {
        return [];
    }

}