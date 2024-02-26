import { Injectable } from "@nestjs/common";

@Injectable()

export class OrdersService {
    createOrder(body: any) {
       return ({status: '202'})
    }
}