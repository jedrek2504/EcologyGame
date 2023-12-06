class UserManager implements IntermoduleUserManager {
    getUsers(filtrator: (user : User) => boolean) : User[] {
        return [];
    }
    createUser(username : string, email : string, password : string) : User | null {
        return null;
    }

    deleteUser(user : User) : boolean {
        return false;
    }

    login(username : string, password : string) : User | null {
        return null;
    }

    logout(target : User) : void {
        
    }

    getEventStream(streamFilter : UMMEventFilter) : EventStream {
        return EventStream.getInstance();
    }
}