import { Injectable } from "@nestjs/common";

@Injectable()
export class HomeService{

   getHome(){
    return "I am on the Home Page";
   }
}