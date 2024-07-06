import { BadRequestException, Body, Controller, Post, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserSignInDTO } from "./dto/user-sign-in.dto";
import { Response } from 'express';
import { AuthService } from "./auth.service";
import { UserSignUpDTO } from "./dto/user-sign-up.dto";

@Controller('auth')
export class AuthController{
    constructor(private _authService:AuthService){}


  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() user: UserSignUpDTO, @Res() res: Response) {
    console.log("signup data",user)
    let response = await this._authService.signup(user);
    if (response.data.accessToken) {
      res.header('Access-Token', response.data.accessToken);
      return res.send(response);
    } else {
      return res.send(response);
    }
  }
  
    @Post('signin')
    async signIn(@Body() user: UserSignInDTO, @Res() res: Response) {
      let response = await this._authService.signIn(user);
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

    @Post('/forgotpassword')
    async forgotPassword(@Body('email') email: string, @Res() res: Response) {
        try {
          const token = await this._authService.generatePasswordResetToken(email);
          if (!token) {
            throw new BadRequestException('Invalid email address'); // Avoid revealing email existence
          }
          const resetLink = `http://localhost:3000/api/v1/user/reset-password?token=${token}&email=${email}`; 
          const resp = await this._authService.sendPasswordResetEmail(email, token); 
          return res.status(resp.status).send(resp);
        } catch (error) {
          return res.status(500).send({ status: 500, data: error.message ,message:"Something went wrong"});
        }
      }
    
}