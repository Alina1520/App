import { DynamicModule, Module } from "@nestjs/common";
import { RestAuthService } from "./auth.service";
import { RestAuthController } from "./auth.controller";
import { SessionModule } from "src/domain/sessions";
import { UserModule } from "src/domain/users";

@Module({})
export class RestAuthModule{
    static forRoot():DynamicModule{
        return {
            module:RestAuthModule,
            imports:[
                SessionModule.forFeature(),
                UserModule.forFeature()
            ],
            providers:[RestAuthService],
            controllers:[RestAuthController],
        }
    }
}