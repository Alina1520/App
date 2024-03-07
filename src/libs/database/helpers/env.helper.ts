import { Connection, DataSource, EntityTarget, ObjectLiteral, ObjectType } from "typeorm"

export const getEnv = (name:string)=>{
    const value = process.env[name]
    if(value===undefined || !value){
        throw new Error(`Env ${value} isnt found`)
    }
    return value
}

export const provEntity = (name:symbol|string,entity:EntityTarget<ObjectLiteral>) => ({
        provide:name,
        useFactory:(connection:DataSource)=>connection.getRepository(entity),
        inject:[DataSource]
    })
