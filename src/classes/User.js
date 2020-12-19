export default class User{

    constructor(user) {
        this.username = user.username
        this.email = user.email
    }

    setPassword(password){
        this.password = password;
    }

}
