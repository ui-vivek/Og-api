import { Injectable } from "@nestjs/common";

@Injectable()

export class CartService {
    async getAllCartItems(){
        return [{start:200,message:"Cart Items Retrieved"}]
    }

    async getCartItem(id:string){
        return [{start:200,data:this.getCartItem(id),message:"Cart Item Retrieved"}]
    }

    async addCartItem(id:number){
        return [{start:200,data:this.addCartItem(id),message:"Cart Item Added"}]
    }
    async deleteCartItem(id:number){
        return [{start:200,data:this.deleteCartItem(id),message:"Cart Item Deleted"}]
    }
    async updateCartItem(id:number){
        return [{start:200,data:this.updateCartItem(id),message:"Cart Item Updated"}]
    }
    async deleteAllCartItem(){
        return [{start:200,data:this.deleteAllCartItem(),message:"All Cart Items Deleted"}]
    }
    
}