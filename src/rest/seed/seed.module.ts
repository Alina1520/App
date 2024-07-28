import { DynamicModule, Module } from "@nestjs/common";
import { ClientModule, PhotographerModule, SessionModule, UserModule } from "src/domain";
import { RestSeedService } from "./seed.service";
import { RestSeedController } from "./seed.controller";

@Module({})
export class RestSeedModule{
    static forRoot():DynamicModule{
        return {
            module:RestSeedModule,
            imports:[
                SessionModule.forFeature(),
                UserModule.forFeature(),
                PhotographerModule.forFeature(),
                ClientModule.forFeature()
            ],
            providers:[RestSeedService],
            controllers:[RestSeedController],
        }
    }
}