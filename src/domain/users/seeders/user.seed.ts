import { Seeder } from "src/libs";
import { AuthUserService } from "../services";
import { Inject, Injectable } from "@nestjs/common";
import { faker } from '@faker-js/faker'
import { AUTH_USER_SERVICE } from "../typing";

@Injectable()
export class UserSeed extends Seeder{
    protected name = "USER SEED"

    constructor(private readonly userService:AuthUserService){
        super()
    }

    protected async seed():Promise<void> {
        for(let i = 0; i<10; i++){
            await this.userService.signUp(this.generateFakeData())
        }
    }

    private generateFakeData(){
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
        const pass = "123"
        
        return {
            firstName,
            lastName,
            email : faker.internet.email(firstName, lastName ),
            pass : pass,
            repeatPass : pass,
        };
 
    }
}