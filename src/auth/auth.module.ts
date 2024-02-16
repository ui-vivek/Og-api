import { Module } from '@nestjs/common';
import { UserSignInService } from './signin/userSignin.service';
import { UserSignUpService } from './signup/userSignup.service';
import { UserSignInController } from './signin/userSignin.controller';
import { UsersSignUpController } from './signup/userSignup.controller';
import { UserUpdateService } from './user-update/user-update.service';
import { UpdateUserController } from './user-update/user-update.controller';

@Module({
  imports: [],
  controllers: [UserSignInController,UsersSignUpController,UpdateUserController],
  providers: [UserSignInService,UserSignUpService,UserUpdateService],
  exports:[]
})
export class AuthModule {}