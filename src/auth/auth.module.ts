import { Module } from '@nestjs/common';
import { UserSignInService } from './signin/userSignin.service';
import { UserSignUpService } from './signup/userSignup.service';
import { UserSignInController } from './signin/userSignin.controller';
import { UsersSignUpController } from './signup/userSignup.controller';
import { UserUpdateService } from './user-update/user-update.service';
import { UpdateUserController } from './user-update/user-update.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { DatabaseModule } from 'src/DataBase/db.module';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from './auth.guard';
require('dotenv').config();
const JWT_SECRET =  process.env.JWT_SECRET
@Module({
  imports: [UserModule,DatabaseModule,UserModule,JwtModule.register({
    global: true,
    secret: JWT_SECRET,
    signOptions: { expiresIn: '5m' },
  }),],
  controllers: [UserSignInController,UsersSignUpController,UpdateUserController],
  providers: [UserSignInService,UserSignUpService,UserUpdateService,],
  exports:[]
})
export class AuthModule {}