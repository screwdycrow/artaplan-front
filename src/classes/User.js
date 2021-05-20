export default class User{

    constructor(user) {
        this.username = user.username
        this.email = user.email
        this.userId = user.userId
    }

    setPassword(password){
        this.password = password;
    }

}
