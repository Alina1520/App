import { DynamicModule, Module } from "@nestjs/common";
import { PhotographerModule } from "src/domain";
import { RestProfileController } from "./profile.controller";
import { RestProfileService } from "./profile.service";

@Module({})
export class RestProfileModule{
    static forRoot():DynamicModule{
        return {
            module:RestProfileModule,
            imports:[PhotographerModule.forFeature()],
            controllers:[RestProfileController],
            providers:[RestProfileService]
        }
    }
}