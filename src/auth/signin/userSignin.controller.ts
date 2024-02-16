import { Body, Controller, Post } from '@nestjs/common';
import { UserSignInDTO } from '../dto/user-sign-in.dto';
import { UserSignInService } from './userSignin.service';
@Controller('/signin')
export class UserSignInController {
  constructor(private _userSignInService: UserSignInService) {}

  @Post()
  signIn(@Body() user: UserSignInDTO) {
    return this._userSignInService.signIn(user);
  }
}
