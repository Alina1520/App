import { Inject, Injectable } from "@nestjs/common";
import { CLIENT_REPOSITORY, ClientRepository } from "src/domain";

@Injectable()
export class RestClProfileService{
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository:ClientRepository

    public async getClientProfileData(userId:number){
        console.log(userId)
        const query = await this.clientRepository
        .createQueryBuilder("it")
        .leftJoinAndSelect("it.user","user")
        .where("it.userId = :userId",{userId})
        .select([
            "user.firstName",
            "user.lastName",
            "user.country",
            "user.city",
            "it.avatar",
            "it.balance"
        ])
        .getOne()

        return query
    }

}