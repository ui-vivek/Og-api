import { Injectable } from "@nestjs/common";
import { UpdateUserDTO } from "../dto/update-user.dto";
import { DbService } from "src/DataBase/db.service";

@Injectable()
export class UserUpdateService{
    constructor (private _dbService: DbService){}
    async updateUser(UserDetails:any){
        if(!UserDetails.email){
            return ({status:201,data:null,message:"User not found"})
        }
        try {
            const userRes = await this._dbService.findUserByEmail(UserDetails.email);
            if(userRes.status != 200){
                return ({status:404,data:{},message:"User not found"})
            }
            return await this._dbService.updateUserByEmail(UserDetails.email,UserDetails).then((updatedUser)=>{
                if(updatedUser.status == 200){
                    return ({status:200,data:{},message:"User updated"})
                }
            }).catch((error)=>{
                return ({status:404,data:error,message:"Somthing Went Wrong"})
            })
            
        } catch (error) {
            return ({status:404,data:error,message:"Somthing Went Wrong"})
        }
        
    }
}