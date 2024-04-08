import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserSignUpDTO } from '../dto/user-sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { DbService } from 'src/DataBase/db.service';
const bcrypt = require('bcrypt');
require('dotenv').config();

@Injectable()
export class UserSignUpService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private _dbService: DbService,
  ) {}
  async signup(userSignUpData: UserSignUpDTO) {
    if (userSignUpData.password !== userSignUpData.conformpassword)
      return { status: 404, data: {}, message: 'Passwords do not match' };
    try {
      const existingUser = await this.userService.findUserByEmail(
        userSignUpData.email,
      );
      if (existingUser.status == 200) {
        return ({status:409,data:{},message:"Username already exists"})
      }
    } catch (error) {
      console.log(error);
    }
    const saltRounds = 12;
    userSignUpData.password = await bcrypt.hash(
      userSignUpData.conformpassword,
      saltRounds,
    );
    delete userSignUpData.conformpassword;
    
    const user = await this._dbService.addUser(userSignUpData);
    const { insertedId } = user;
    const idString = insertedId.toString();
    const payload = {
      userID: idString,
      sub: userSignUpData.fullname,
    };
    const accessToken =  this.jwtService.sign(payload);
    if (!user.acknowledged)
      return { status: 404, data: {}, message: 'Something went wrong' };
    return  { status: 201, data: {accessToken}, message: 'User Created Successfully' };
  }
}
