import { Body, Controller, Param, Post } from "@nestjs/common";
import { ForgotPasswordService } from "./forgot-password.service";

@Controller()
export class ForgotPasswordController{
    constructor(private _forgotpassword:ForgotPasswordService){}

    @Post(':id')
    changePassword(@Body() newPassword:string, @Param('id') id:number){
        if(!id){
            return ({status:404,data:null,message:"User not found"});
        }
        return this._forgotpassword.changePassword(newPassword, id)
    }
}