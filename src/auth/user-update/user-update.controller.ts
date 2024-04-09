import { Body, Controller, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserUpdateService } from "./user-update.service";
import { UpdateUserDTO } from "../dto/update-user.dto";

@Controller('/update')
export class UpdateUserController{
    constructor(private _userUpadet:UserUpdateService){}
    @Post()
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true}))
    async updateuser(@Body() user:UpdateUserDTO){
        if(!user){
            return ({status:404,data:{},mesage:"User not found"}); 
        }
        try {
            let data = await this._userUpadet.updateUser(user);
            if(data.status !== 200){
                return ({status:404,data:{},message:"User not found"})
            }
            return ({status:200,data:{},message:"User updated"})
        } catch (error) {
            return ({status:404,data:error,message:"Somthing Went Wrong"})
        }
    }
}