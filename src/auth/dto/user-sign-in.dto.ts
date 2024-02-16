import { IsBoolean, IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class UserSignInDTO{
    @IsEmail()
    @IsNotEmpty()
    email:string;
    
    @IsNotEmpty()
    password:string;

    @IsBoolean()
    @IsOptional()
    keeplogin:boolean;
}