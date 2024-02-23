import { Controller, Get } from "@nestjs/common";
import { HomeService } from "./home.service";

@Controller()
export class HomeController {
    constructor(private homeService:HomeService) {}

    @Get()
    getHello(): string {
        return this.homeService.getHome();
    }
}