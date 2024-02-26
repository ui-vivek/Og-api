import { Body, Controller, Post, Res, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { JwtAuthGuard } from "src/auth/auth.guard";

@Controller('orders')
@UseGuards(JwtAuthGuard)

export class OrdersController {
    
    constructor(private _ordersService: OrdersService){}

    @Post()
    async createOrder() {
        return ({status:true})
    }
}