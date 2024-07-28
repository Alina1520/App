import { Inject, Injectable } from "@nestjs/common";
import { IPhotographer, IPhotographerRepository, IProfile, IProfileService, PHOTOGRAPHERS_REPOSITORY, PROFILE_SERVICE, USER_REPOSITORY, UserRepository } from "src/domain";

@Injectable()
export class RestProfileService{
    @Inject(PROFILE_SERVICE)
    private readonly profileService:IProfileService
    
    @Inject(PHOTOGRAPHERS_REPOSITORY)
    private readonly photographerRepository:IPhotographerRepository

    public async getPhotographerData(userId: number) {
        const query = await this.photographerRepository
        .createQueryBuilder("it")
        .leftJoinAndSelect("it.user","user")
        .where("it.userId = :userId",{userId})
        .select([
            "user.firstName",
            "user.lastName",
            "user.accountType",
            "user.country",
            "user.city",
            "it.available",
            "it.avatar",
            "it.balance"
        ])
        .getOne()
       
           return query       
       }

       public async getProfile(userId: number) {
        const photographerData = await this.profileService.getPhotographerById(userId)
        
        const {
            speciality,
            rating,
            jobs,
            amount,
            per,
            currency,
            shots,
            aboutYou,
            portfolio,
            feedbackIds
        } = photographerData;

        const shotResult = shots === null ? "Clients will see them near your profile in search result"  :  shots
        const portfolioResult = portfolio === null ? "Portfolio works will be shown here"  :  portfolio
        const jobsResult = !jobs ? "Work history will be shown here"  :  jobs
    
        const photographerProfile = {
            speciality,
            rating,
            jobs:jobsResult,
            amount,
            per,
            currency,
            shots:shotResult,
            aboutYou,
            portfolio:portfolioResult,
            feedbackIds
        };

        return photographerProfile
    }

    public async updateProfileData(userId:number,data:any){
        await this.profileService.changePhotographerData(userId,data)
    }


}