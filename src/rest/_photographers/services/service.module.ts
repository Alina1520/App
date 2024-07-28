import { DynamicModule, Module } from "@nestjs/common";
import { PhotographerModule } from "src/domain";
import { RestServices } from "./service.service";
import { RestServicesController } from "./service.controller";

@Module({})
export class RestServiceModule{
    static forRoot():DynamicModule{
        return {
            module:RestServiceModule,
            imports:[PhotographerModule.forFeature()],
            providers:[RestServices],
            controllers:[RestServicesController]
        }
    }
}