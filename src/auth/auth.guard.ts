import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService,private userService :UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.accesstoken;
    try {
      const payload = await this.jwtService.verify(token);
      // Additional user validation (optional)
      // e.g., check the database if the user with payload.sub (userId) exists and is active 
      const user = await this.userService.findUserById(payload.userID); 
      if (!user) {
        throw new UnauthorizedException('User not found or inactive');
      }

      request.user = payload; // Attach user details
      return true;

    } catch (e) {
      throw new UnauthorizedException('Invalid or expired token'); 
    }
  }
}
