import { Controller } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller()
export class UserController{
    constructor( private _userService: UserService){}
}