import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { DatabaseModule } from "src/DataBase/db.module";

@Module({
    imports: [DatabaseModule],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule{}