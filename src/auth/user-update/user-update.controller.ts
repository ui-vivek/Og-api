import { Body, Controller, Param, Post } from "@nestjs/common";
import { UserUpdateService } from "./user-update.service";
import { UpdateUserDTO } from "../dto/update-user.dto";

@Controller('/update')
export class UpdateUserController{
    constructor(private _userUpadet:UserUpdateService){}

    @Post(':id')
    updateuser(@Body() user:UpdateUserDTO , @Param('id') id:number){
        if(!id){
            return ({status:404,data:null,mesage:"User not found"});
        }
        return this._userUpadet.updateUser(user, id)
    }
}