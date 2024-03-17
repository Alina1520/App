import { DynamicModule, Module } from "@nestjs/common";
import { provClass, provEntity } from "src/libs";
import { JOB_REPOSITORY, JOB_SERVICE } from "./typing";
import { Jobs } from "./entities";
import { JobService } from "./services/job.service";

@Module({})
export class ClientModule{
    static getProviders(){
        return [
            provEntity(JOB_REPOSITORY,Jobs),
            provClass(JOB_SERVICE,JobService)
        ]
    }
    static getExports(){
        return [JOB_SERVICE]
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