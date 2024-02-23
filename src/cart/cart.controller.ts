import { Body, Controller, Delete, Get, Param, Post, Put, Req } from "@nestjs/common";
import { CartService } from "./cart.service";

@Controller('cart')
export class CartController {
    constructor(private _cartService: CartService) {}
    
    @Get('item/:id')
    async getCartItem(@Param('id') id: string) {
        return this._cartService.getCartItem(id);
    }
    @Get('all')
    async getAllCartItems(@Req() res:any) {
        console.log(res.user)
        return this._cartService.getAllCartItems();
    }
    @Post('add')
    async addCartItem(@Body() cart: any) {
        return this._cartService.addCartItem(cart);
    }
    @Put('update')
    async updateCart(@Body() cart: any) {
        return this._cartService.updateCartItem(cart);
    }
    @Delete('delete/:id')
    async deleteCartItem(@Body() cart: any){
        return this._cartService.deleteCartItem(cart);
    }
}