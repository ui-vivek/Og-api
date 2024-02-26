import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserSignInDTO } from '../dto/user-sign-in.dto';
import { UserSignInService } from './userSignin.service';
import { Response } from 'express';
@Controller('/signin')
export class UserSignInController {
  constructor(private _userSignInService: UserSignInService) {}

  @Post()
  async signIn(@Body() user: UserSignInDTO, @Res() res: Response) {
    let response = await this._userSignInService.signIn(user);
    if (response.data.access_token) {
      res.header('Access-Token', response.data.access_token);
      return res.send(response);
    } else {
      return res.send({
        status: 500,
        data: {},
        message: 'Invalid Credentials',
      });
    }
  }
}
