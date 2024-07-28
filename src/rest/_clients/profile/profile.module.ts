import { DynamicModule, Module } from "@nestjs/common";
import { ClientModule, UserModule } from "src/domain";
import { RestClProfileService } from "./profile.service";
import { RestClProfileController } from "./profile.controller";

@Module({})
export class RestClProfileModule{
    static forRoot():DynamicModule{
        return {
            module:RestClProfileModule,
            imports:[ClientModule.forFeature()],
            providers:[RestClProfileService],
            controllers:[RestClProfileController]
        }
    }
}