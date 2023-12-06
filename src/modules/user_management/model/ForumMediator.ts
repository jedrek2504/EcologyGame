interface ForumMediator {
    registerPost(user : ForumUser, post : Object) : boolean;
    unregisterPost(user : ForumUser, post : Object) : boolean;
    postList(user : ForumUser) : Object[];
}