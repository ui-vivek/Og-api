import { IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrderDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userID: string;

    @IsNumber()
    @ApiProperty()
    @IsNotEmpty()
    price: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsObject()
    description: object;
    
    // @ApiProperty()
    // @IsNotEmpty()
    // createdAt: number;

    isDeleted: boolean=false;
    isActive: boolean =true;
}

