import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  fullname: string;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  @IsNumber()
  mobile: number;

  @IsNumber()
  @MaxLength(6)
  @MinLength(6)
  pincode: number;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsOptional()
  HouseNumber: number;

  @IsNotEmpty()
  @IsString()
  CityTown:string;

  @IsOptional()
  @IsString()
  Locality:string;

  @IsOptional()
  @IsString()
  Landmark:string;

  @IsOptional()
  @IsNotEmpty()
  State:string;

  @IsOptional()
  @IsNotEmpty()
  Alternative:number;

  @IsNotEmpty()
  @IsString()
  HomeWork:string;
}
