import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class UserSignUpDTO {

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  conformpassword: string;

  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  fullname: string;

  @IsOptional()
  gender: string;

  @IsNotEmpty()
  @IsNumber()
  mobile: number;

}