import { BadRequestException, Injectable } from "@nestjs/common";
import { IPasswordService } from "../typing";
import * as bcrypt from "bcrypt"

@Injectable()
export class PasswordService implements IPasswordService{
    public comparePassword(pass: string, repeatPass: string): boolean {
       return (pass===repeatPass)
    }
    public async compareHashedPassword(password: string, hashed: string): Promise<Boolean> {
        return await bcrypt.compare(password,hashed)
    }
    public async hashPassword(password: string){
        return await bcrypt.hash(password,10)
    }

}