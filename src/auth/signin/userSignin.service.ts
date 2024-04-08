import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserSignInDTO } from '../dto/user-sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
const bcrypt = require('bcrypt');
@Injectable()
export class UserSignInService {
  constructor(
    private jwtService: JwtService,
    private _userService: UserService,
  ) {}

  async signIn(userSignInData: UserSignInDTO) {
    try {
      const userRes = await this._userService.findUserByEmail(
        userSignInData.email,
      );
      if (userRes.status == 404) {
        return { status: 404, data: {}, message: 'Invalid Credentials' };
      }
      let user = userRes.data as any;
      if (user.password) {
        const isPasswordValid = await bcrypt.compare(
          userSignInData.password,
          user.password,
        );
        if (!isPasswordValid) {
          return { status: 401, data: {}, message: 'Incorrect password' };
        }
        const { _id } = user;
        const idString = _id.toString();
        const payload = {
          userID: idString,
          sub: user.fullname,
        };
       let access_token =  this.jwtService.sign(payload)
        return ({status:201,data:{access_token},message:"Access token"});
      } else {
        return { status: 404, data: {}, message: 'Invalid Credentials' };
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      return {
        status: 500,
        data: {},
        message: 'An error occurred during sign-in',
      };
    }
  }
}
