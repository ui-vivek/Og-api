import { Injectable } from "@nestjs/common";
import { UpdateUserDTO } from "../dto/update-user.dto";

@Injectable()
export class UserUpdateService{
    updateUser(user:UpdateUserDTO , id:number){
        //TODO: check
        //find the user from db
        //let user = this.db. findUser
        if(!user){
            return ({status:201,data:null,message:"User not found"})
        }
        //write logic to update the user in db
        return ({status:200,data:{},message:"User updated"})
    }
}