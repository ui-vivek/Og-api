import { Body, Controller, Post } from "@nestjs/common";
import { UserSignUpService } from "./userSignup.service";
import { UserSignUpDTO } from "../dto/user-sign-up.dto";

@Controller('signup')
export class UsersSignUpController{
    constructor(private _userSignUpService:UserSignUpService){}

    @Post()
    createUser(@Body() user:UserSignUpDTO){
       let signup= this._userSignUpService.userSignUp(user)
       return signup;
    }
}