import { DynamicModule, Module } from "@nestjs/common";
import { provClass, provEntity } from "src/libs";
import { CLIENT_REPOSITORY, JOB_REPOSITORY, JOB_SERVICE } from "./typing";
import { Client, Jobs } from "./entities";
import { JobService } from "./services/job.service";

@Module({})
export class ClientModule{
    static getProviders(){
        return [
            provEntity(JOB_REPOSITORY,Jobs),
            provEntity(CLIENT_REPOSITORY,Client),
            provClass(JOB_SERVICE,JobService)
        ]
    }
    static getExports(){
        return [JOB_SERVICE,JOB_REPOSITORY,CLIENT_REPOSITORY]
    }
    static forRoot():DynamicModule{
        return {
            module:ClientModule,
            providers:ClientModule.getProviders(),
            exports:ClientModule.getExports()
        }
    }
    static forFeature():DynamicModule{
        return {
            module:ClientModule,
            providers:ClientModule.getProviders(),
            exports:ClientModule.getExports()
        }
    }
}