import { DynamicModule, Module } from "@nestjs/common";
import { RestUserInfoService } from "./info.service";
import { RestUserInfoController } from "./info.controller";
import { AuthUserModule } from "src/domain";

@Module({})
export class RestUserInfoModule{
    static forRoot():DynamicModule{
        return {
            module:RestUserInfoModule,
            providers:[RestUserInfoService],
            controllers:[RestUserInfoController],
            imports:[AuthUserModule.forFeature()]
        }
    }
}