import { Injectable } from "@nestjs/common";
import { UserSignInDTO } from "../dto/user-sign-in.dto";

Injectable()
export class UserSignInService{
    users=[]
    signIn(UserSignInData:UserSignInDTO){
        this.users.push(UserSignInData)
    }
}