import { Module } from '@nestjs/common';
import { UserSignInService } from './signin/userSignin.service';
import { UserSignUpService } from './signup/userSignup.service';
import { UserSignInController } from './signin/userSignin.controller';
import { UsersSignUpController } from './signup/userSignup.controller';

@Module({
  imports: [],
  controllers: [UserSignInController,UsersSignUpController],
  providers: [UserSignInService,UserSignUpService],
  exports:[]
})
export class AuthModule {}