import { Injectable } from "@nestjs/common";

@Injectable()
export class ForgotPasswordService {
    changePassword(newPassword:string,id:number){
        if(!id){
            return ({status:404,data:null,message:"User not found"});
        }
        //TODO: check
        // find the user from db
        // let user = this.db.findUser
        // if(!user){
        //     return ({status:404,data:null,message:"User not found"})
        // }
        //TODO: check
        //increpet the password before updating
        // update the user in db
        return ({status:200,data:{},message:"Password updated"})
    }
}