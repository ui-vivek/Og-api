import { Injectable } from "@nestjs/common";
import { DbService } from "src/DataBase/db.service";

@Injectable()

export class OrdersService {
    constructor(private _db:DbService){}
    async createOrder(body: any) {
       let order =  await this._db.addOrder(body);
       console.log(order)
       return order;
    }
    async allCanceledOdrders(){

    }

    async getAllOrder(userID:string){
        let res = await this._db.getAllOrder(userID)
        return res;
    }

    async updateOrder(id){

    }
    

}