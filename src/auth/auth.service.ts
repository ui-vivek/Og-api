import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserSignInDTO } from './dto/user-sign-in.dto';
import { DbService } from 'src/DataBase/db.service';
import { UserSignUpDTO } from './dto/user-sign-up.dto';
import { v4 as uuidv4 } from 'uuid';
const bcrypt = require('bcrypt');
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private _dbService: DbService,
    private readonly mailerService: MailerService
  ) {}

  async signup(userSignUpData: UserSignUpDTO) {
    if (userSignUpData.password !== userSignUpData.conformpassword)
      return { status: 404, data: {}, message: 'Passwords do not match' };
    try {
      const existingUser = await this._dbService.findUserByEmail(
        userSignUpData.email,
      );
      if (existingUser.status == 200) {
        return { status: 409, data: {}, message: 'Username already exists' };
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
    const accessToken = this.jwtService.sign(payload);
    if (!user.acknowledged)
      return { status: 404, data: {}, message: 'Something went wrong' };
    return {
      status: 201,
      data: { accessToken },
      message: 'User Created Successfully',
    };
  }
  async signIn(userSignInData: UserSignInDTO) {
    try {
      const userRes = await this._dbService.findUserByEmail(
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
        let access_token = this.jwtService.sign(payload);
        return { status: 201, data: { access_token }, message: 'Access token' };
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

  async generatePasswordResetToken(email: string) {
    try {
      const user = await this._dbService.findUserByEmail(email);
      if (!user) {
        return null; // Don't reveal if email exists for security
      }
      const existingRequests:any = await this._dbService.findUserInForgotPassword( email );
      let newRequestCount = 1; 
      if (existingRequests && existingRequests.length > 0) {
        newRequestCount += existingRequests[0].passwordResetChangeRequest;
        await this._dbService.deleteUserInForgotPassword( email ); 
      }
      const passwordResetToken = uuidv4();
      const passwordResetTokenExpiration = new Date(Date.now() + 900000); 
      const newRequest = {
        email,
        passwordResetToken,
        passwordResetTokenExpiration,
        passwordResetChangeRequest: newRequestCount,
        passwordChanged:false
      };
      const savedRequest:any = await this._dbService.createForgotPassword(newRequest);
      return  savedRequest.passwordResetToken
    } catch (err) {
      console.error('Error generating password reset token:', err);
      throw new InternalServerErrorException('Error generating password reset token'); 
    }
  }

  async sendPasswordResetEmail(email: string, token: string) {
    let frontendurl = `http://localhost:4200/user/change-password?token=${token}&email=${email}`
    const subject = 'Password Reset Request';
    try {
      await this.mailerService.sendMail({
        to: email,
        subject,
        template: 'password-reset',
          context: {
            frontendurl: frontendurl,
          },
      });
      return { status: 201, data: {}, message: "Password reset link has been sent to your email and valid for 15 minutes." };
    } catch (err) {
      console.error("Error sending password reset email:", err);
      return { status: 501, data: {}, message: "Something went wrong when sending password reset link" };
    }
  }
}
