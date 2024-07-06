import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './DataBase/db.module';
import { CartController } from './cart/cart.controller';
import { AuthMiddleware } from './middleware/auth.middleware';
import { CartService } from './cart/cart.service';
import { UserModule } from './user/user.module';
// import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { UserService } from './user/user.service';
import { JwtAuthGuard } from './auth/auth.guard';
import { OrdersModule } from './orders/oder.module';
import { MailerModule } from '@nestjs-modules/mailer';
import * as path from 'path';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';


@Module({
  imports: [AuthModule,DatabaseModule,UserModule,OrdersModule,
    MailerModule.forRoot({
      transport: {
        host:  'smtp.gmail.com',
        port: 587,
        secure: false, 
        auth: {
          user: 'dilip.kumar@ongraph.com', 
          pass: 'coxy rrsf lxdc hawh'
        },
      },
      defaults: {
        from: '"OnGraph" <dilip.kumar@ongraph.com>',
      },
      template: {
        dir: path.join(__dirname, '../src', 'templates'), 
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController,CartController],
  providers: [AppService,CartService,AuthMiddleware,OrdersService,UserService], 
})
export class AppModule {
  configure(consumer:MiddlewareConsumer){
    consumer.apply(AuthMiddleware).forRoutes(CartController);
  }
}