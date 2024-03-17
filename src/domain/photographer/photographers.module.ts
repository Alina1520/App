import { DynamicModule, Module } from "@nestjs/common";
import { PHOTOGRAPHERS_REPOSITORY, PROFILE_SERVICE } from "./typing";
import { provClass, provEntity } from "src/libs";
import { Photographer } from "./entities";
import { ProfileService } from "./services";

@Module({})
export class PhotographerModule{
    static getroviders(){
        return [
            provEntity(PHOTOGRAPHERS_REPOSITORY,Photographer),
            provClass(PROFILE_SERVICE,ProfileService),
        ]
    }
    static getExports(){
        return [PHOTOGRAPHERS_REPOSITORY,PROFILE_SERVICE]
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