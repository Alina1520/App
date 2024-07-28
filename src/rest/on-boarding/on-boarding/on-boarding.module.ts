import { DynamicModule, Module } from "@nestjs/common";
import { RestOnBoardingService} from "./on-boarding.service";
import { RestOnBoardingController } from "./on-boarding.controller";
import { UserModule } from "src/domain";

@Module({})
export class RestOnBoardModule{
    static forRoot():DynamicModule{
        return {
            module:RestOnBoardModule,
            providers:[RestOnBoardingService],
            controllers:[RestOnBoardingController],
            imports:[UserModule.forFeature()]
        }
    }
}