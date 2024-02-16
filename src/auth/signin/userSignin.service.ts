import { Injectable } from "@nestjs/common";
import { UserSignInDTO } from "../dto/user-sign-in.dto";

Injectable()
export class UserSignInService{
    users=[]
    //TODO: check
    //return some token to store in local storage
    signIn(UserSignInData:UserSignInDTO){
        this.users.push(UserSignInData)
    }
}