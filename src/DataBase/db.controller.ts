
import { Controller, Post, Body, Get, Param, Header, Headers } from '@nestjs/common';
import { UsersService } from './db.service';


@Controller('user') 
export class DbController {
    constructor(private readonly dbService: UsersService) {}
    @Post('create')
    async createData(@Body() createDataDto: any) {
      return this.dbService.create(createDataDto);
    }


    @Get('get/:id')
    findUSer(@Param('id') id: string, @Headers('') headers: any){  //TODO: check auth 
        return this.dbService.findOne(id)
    }
    
}
