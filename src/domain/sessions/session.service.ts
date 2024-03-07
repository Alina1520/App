import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ISession, ISessionService, SESSION_REPOSITORY, SessionRepository } from "./typing";
import { JwtService } from "src/libs";
import { TokenPairs } from "../users";

@Injectable()
export class SessionService implements ISessionService{
    @Inject(SESSION_REPOSITORY)
    private readonly sessionRepository:SessionRepository
    constructor(
        private readonly jwtService:JwtService
    ){}
    
    public async start(userId: number): Promise<ISession> {
        const session = this.sessionRepository.create({
            userId:userId,
            accessToken:'',
            refreshToken:''
        })    
        const tokens = this.generateToken(userId,session.id)
        await this.sessionRepository.save({
            id:session.id,
            userId:userId,
            ...tokens
        })
        return tokens
    }

    public async refresh(token: string): Promise<TokenPairs> {
        const session = await this.sessionRepository.findOneBy({refreshToken:token})
        if(!session) throw new NotFoundException()

        const tokens = this.generateToken(session.userId,session.id)
        await this.sessionRepository.save({
            id:session.id,
            userId:session.userId,
            ...tokens
        })
        return tokens        
    }

    private generateToken(userId:number,sessionId:number){
        return {
            accessToken:this.jwtService.createToken({id:userId,sessionId:sessionId}),
            refreshToken:this.jwtService.createToken({id:userId,sessionId:sessionId,expiresIn:null}),
        }
    }

}