import { Inject, Injectable } from "@nestjs/common";
import { ICreateTokenPayload, JWT_KEY, JWT_PAYLOAD_KEY } from "./typing";
import * as jwt from "jsonwebtoken"

@Injectable()
export class JwtService{
    @Inject(JWT_KEY) 
    private readonly jwtKey:string
    @Inject(JWT_PAYLOAD_KEY)
    private readonly jwtPayloadKey:string
    public createToken({id,sessionId,expiresIn="15m"}:ICreateTokenPayload){
        const payload = {
            sub: JSON.stringify({
                payloadKey:this.jwtPayloadKey,
                id,
                sessionId,
            })        
        }
        return jwt.sign(payload,this.jwtKey,expiresIn ?{expiresIn}:{})
    }

    public decodeToken(token:string){
        const result = jwt.verify(token,this.jwtKey)
        if(!result) return null
        const decrypted = JSON.parse(result.sub as string)
        return {
            id:decrypted.id,
            sessionId:decrypted.sessionId
        }
    }
}