import {
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserSignUpService } from './userSignup.service';
import { UserSignUpDTO } from '../dto/user-sign-up.dto';
import { Response } from 'express';

@Controller()
export class UsersSignUpController {
  constructor(private _userSignUpService: UserSignUpService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() user: UserSignUpDTO, @Res() res: Response) {
    console.log("signup data",user)
    let response = await this._userSignUpService.signup(user);
    if (response.data.accessToken) {
      res.header('Access-Token', response.data.accessToken);
      return res.send(response);
    } else {
      return res.send(response);
    }
  }
}
