import { DynamicModule, Module } from "@nestjs/common";
import { ClientModule, PhotographerModule } from "src/domain";
import { RestPhProposalsController } from "./controllers";
import { RestPhProposalService } from "./services";

@Module({})
export class RestPhJobModule{
    static forRoot():DynamicModule{
        return {
            module:RestPhJobModule,
            imports:[ClientModule.forFeature(),PhotographerModule.forFeature()],
            controllers:[RestPhProposalsController],
            providers:[RestPhProposalService]
        }
    }
}