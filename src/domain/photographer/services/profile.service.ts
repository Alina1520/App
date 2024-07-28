import { Inject, Injectable } from "@nestjs/common";
import { IPhotographer, IPhotographerRepository, IProfile, IProfileService, PHOTOGRAPHERS_REPOSITORY } from "../typing";
import { USER_REPOSITORY, UserRepository } from "src/domain/users";

@Injectable()
export class ProfileService implements IProfileService {
    @Inject(PHOTOGRAPHERS_REPOSITORY)
    private readonly photographerRepository:IPhotographerRepository

    public async changePhotographerData(userId:number,data:any){
        const photographerData = await this.getPhotographerById(userId)

        const newData = {...photographerData,...data}

        await this.photographerRepository.save(newData)      
    }

    public async getPhotographerById(id:number){
        const photographerData = await this.photographerRepository
        .createQueryBuilder("it")
        .leftJoinAndSelect("it.user","us")
        .where("us.id = :id", { id })
        .getOne()

        return photographerData;

    }
}