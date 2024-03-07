import { DatabaseModule, getEnv } from "src/libs"
import { ENTITIES } from "./entitiy.config"

const getDatabaseConfig = ():Parameters<(typeof DatabaseModule)['forRoot']>=> {
    return [{
            type:"postgres",
            port:Number(getEnv("DB_PORT")),
            host:getEnv("DB_HOST"),
            database:getEnv("DB_NAME"),
            username:getEnv("DB_USER"),
            password:getEnv("DB_PASS"),
            synchronize:true
        },
        ENTITIES
    ]

}
const getjwtTokenConfig = () =>{
    return {
            payloadKey:getEnv("JWT_PAYLOAD_KEY"),
            jwtKey:getEnv("JWT_KEY")
        }
}

export const $config = {
    getDatabaseConfig,
    getjwtTokenConfig
}