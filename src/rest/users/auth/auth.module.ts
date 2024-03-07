import { DynamicModule, Module } from "@nestjs/common";
import { RestAuthService } from "./auth.service";
import { RestAuthController } from "./auth.controller";
import { SessionModule } from "src/domain/sessions";
import { AuthUserModule } from "src/domain/users";

@Module({})
export class RestAuthModule{
    static forRoot():DynamicModule{
        return {
            module:RestAuthModule,
            imports:[
                SessionModule.forFeature(),
                AuthUserModule.forFeature()
            ],
            providers:[RestAuthService],
            controllers:[RestAuthController],
        }
    }
}