import { TokenPairs } from "src/domain/users";
import { ISession } from "./session.interface";

export interface ISessionService{
    start(userId:number):Promise<ISession>
    refresh(token:string):Promise<TokenPairs>
}