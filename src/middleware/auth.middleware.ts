import { Injectable, NestMiddleware, Next, Req, Res, UnauthorizedException } from "@nestjs/common";
import { NextFunction,Request, Response} from "express";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware{
    constructor(private userservice: UserService){}
    // use(@Req() red :Request ,@Res() res:Response, @Next() next:NextFunction) {
        
    // }

    async use(req: any, res: Response, next: NextFunction) {
        const authHeader = req.headers.token;
        if(!authHeader) throw new UnauthorizedException()
        const user = await this.userservice.validateToken(authHeader);
        if(!user) throw new UnauthorizedException();
        req.user = user; 
        next();
    }

    // async use(req: any, res: Response, next: NextFunction) {
    //     const authHeader = req.headers.authorization;
    //     if (!authHeader) throw new UnauthorizedException();
    //     const user = await this.authService.validateToken(authHeader);
    //     if (!user) throw new UnauthorizedException();
    //     req.user = user; // Add user info to the request object
    //     next();
    // }
}