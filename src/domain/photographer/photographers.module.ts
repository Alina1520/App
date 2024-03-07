import { DynamicModule, Module } from "@nestjs/common";
import { PHOTOGRAPHERS_REPOSITORY } from "./typing";
import { provEntity } from "src/libs";
import { Photographer } from "./entities";

@Module({})
export class PhotographerModule{
    static getroviders(){
        return [
            provEntity(PHOTOGRAPHERS_REPOSITORY,Photographer),
        ]
    }
    static getExports(){
        return [PHOTOGRAPHERS_REPOSITORY]
    }
    static forRoot():DynamicModule{
        return {
            module:PhotographerModule,
            providers:PhotographerModule.getroviders(),
            exports:PhotographerModule.getExports()
        }
    }
    static forFeature():DynamicModule{
        return {
            module:PhotographerModule,
            providers:PhotographerModule.getroviders(),
            exports:PhotographerModule.getExports()
        }
    }

}