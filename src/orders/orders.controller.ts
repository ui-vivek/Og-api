import { Body, Controller, Get, Param, Post, Put, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { JwtAuthGuard } from "src/auth/auth.guard";
import { CreateOrderDTO } from "./dto/create-order.dto";
import {Response} from 'express'

@Controller('orders')
@UseGuards(JwtAuthGuard)

export class OrdersController {
    
    constructor(private _ordersService: OrdersService){}

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async createOrder(@Body() order: CreateOrderDTO,@Res() res: Response) {
        let response = await this._ordersService.createOrder(order);
        if(response){
            return res.send(response);
        }
    }

    @Get()
    cancleOrder(id:number){
        return this._ordersService.createOrder(id)
    }

    @Get('all/:userId')
    async getAllOrders(@Param('userId') userId:string) {
        console.log(userId,"user aa gya ?")
        return await this._ordersService.getAllOrder(userId)
    }

    @Get('canceled')
    getCanceledOdrders(){  //TODO: check auth 
        return this._ordersService.allCanceledOdrders()
    }

    @Put('canceled')
    async updateOrder(id:number){
        return this._ordersService.updateOrder(id)
    }
}