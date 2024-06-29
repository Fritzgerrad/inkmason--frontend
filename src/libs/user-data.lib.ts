import { User } from "@src/models/User";

export class UserService{

    static saveUser(user:User){
        window.location.reload()
        sessionStorage.setItem("name",user.firstname);
        sessionStorage.setItem("id",user.id);
        sessionStorage.setItem("role",user.role);
    }

    static getUser():User | null{
        const firstname = sessionStorage.getItem("name");
        const id = sessionStorage.getItem("id");
        const role = sessionStorage.getItem("role");
        if(firstname && id && role){
            return {firstname,id,role,};
        }
        return null
    }

    static deleteUser(){
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("role");   
        window.location.reload()
 
    }
}