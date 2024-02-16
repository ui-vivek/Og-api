import { Injectable } from "@nestjs/common";
import { UserSignUpDTO } from "../dto/user-sign-up.dto";

@Injectable()
export class UserSignUpService{
    createUsers=[]
    userSignUp(userSignUpData:UserSignUpDTO){
        this.createUsers.push(userSignUpData)
        return ({start:200,data:this.createUsers,message:"User Created"})
    }
}