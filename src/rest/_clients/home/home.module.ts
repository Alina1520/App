import { DynamicModule, Module } from "@nestjs/common";
import { PhotographerModule, UserModule } from "src/domain";
import { RestHomeService } from "./home.service";
import { RestHomeController } from "./home.controller";

@Module({})
export class RestHomeModule{
    static forRoot():DynamicModule{
        return {
            module:RestHomeModule,
            imports:[UserModule.forFeature(),PhotographerModule.forFeature()],
            providers:[RestHomeService],
            controllers:[RestHomeController]
        }
    }
}