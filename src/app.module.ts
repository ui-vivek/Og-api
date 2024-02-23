import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './DataBase/db.module';
import { CartController } from './cart/cart.controller';
import { AuthMiddleware } from './middleware/auth.middleware';
import { CartService } from './cart/cart.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule,DatabaseModule,UserModule],
  controllers: [AppController,CartController],
  providers: [AppService,CartService,AuthMiddleware],
})
export class AppModule {
  configure(consumer:MiddlewareConsumer){
    consumer.apply(AuthMiddleware).forRoutes(CartController);
  }
}