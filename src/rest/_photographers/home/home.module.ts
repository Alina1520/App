import { DynamicModule, Module } from "@nestjs/common";
import { RestPhHomeService } from "./home.service";
import { ClientModule, PhotographerModule } from "src/domain";
import { RestPhHomeController } from "./home.controller";
import { RestJobService } from "src/rest/_clients";

@Module({})
export class RestPhHomeModule{
    static forRoot() :DynamicModule {
        return {
            module:RestPhHomeModule,
            providers:[RestPhHomeService,RestJobService],
            imports:[PhotographerModule.forFeature(),ClientModule.forFeature()],
            controllers:[RestPhHomeController]


        }
    }
}