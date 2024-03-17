import { DynamicModule, Module } from "@nestjs/common";
import { RestJobService } from "./job.service";
import { RestJobController } from "./job.controller";
import { ClientModule } from "src/domain";

@Module({})
export class RestJobModule{
    static forRoot():DynamicModule{
        return {
            module:RestJobModule,
            providers:[RestJobService],
            controllers:[RestJobController],
            imports:[ClientModule.forFeature()]
        }
    }
}