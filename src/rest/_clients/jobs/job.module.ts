import { DynamicModule, Module } from "@nestjs/common";
import { RestJobService } from "./job.service";
import { ClientModule, PhotographerModule } from "src/domain";
import { RestJobController } from "./job.controller";

@Module({})
export class RestJobModule{
    static forRoot():DynamicModule{
        return {
            module:RestJobModule,
            providers:[RestJobService],
            controllers:[RestJobController],
            imports:[ClientModule.forFeature(),PhotographerModule.forFeature()]
        }
    }
}