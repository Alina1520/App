import { DynamicModule, Global, Module } from "@nestjs/common";
import { IJwtModuleOptions, JWT_KEY, JWT_PAYLOAD_KEY } from "./typing";
import { JwtService } from "./jwt.service";
import { provValue } from "../database";

@Global()
@Module({})
export class JwtModule{
    static options:IJwtModuleOptions
    static getProviders(){
        return [
            JwtService,
            provValue(JWT_KEY,JwtModule.options.jwtKey),
            provValue(JWT_PAYLOAD_KEY,JwtModule.options.payloadKey),
        ]
    }

    static forRoot(options:IJwtModuleOptions):DynamicModule{
        JwtModule.options = options
        return {
            module:JwtModule,
            providers:JwtModule.getProviders()
        }
    }

    static forFeature():DynamicModule{
        return {
            module:JwtModule,
            providers:JwtModule.getProviders(),
            exports:[JwtService],
        }
    }
}
