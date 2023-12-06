interface IntermoduleUserManager {
    getUsers(filtrator: (user : User) => boolean) : User[];
    getEventStream(streamFilter : UMMEventFilter) : EventStream;
}