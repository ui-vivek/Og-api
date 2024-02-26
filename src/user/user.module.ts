import { Global, Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { DatabaseModule } from "src/DataBase/db.module";

@Global()
@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [UserService],
    exports:[UserService]
})
export class UserModule {}