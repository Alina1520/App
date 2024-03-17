import { Inject, Injectable } from "@nestjs/common";
import { IPhotographer, IPhotographerRepository, IProfile, IProfileService, PHOTOGRAPHERS_REPOSITORY } from "../typing";
import { USER_REPOSITORY, UserRepository } from "src/domain/users";

@Injectable()
export class ProfileService implements IProfileService {
    @Inject(USER_REPOSITORY)
    private readonly userRepository:UserRepository
    @Inject(PHOTOGRAPHERS_REPOSITORY)
    private readonly photographerRepository:IPhotographerRepository

    public async getPhotographerData(userId: number):Promise<IPhotographer> {
         const user = await this.userRepository.findOneBy({id:userId})
         const photographerData = await this.photographerRepository.findOneBy({userId})
         const data:IPhotographer = {
             firstName:user.firstName,
             lastName:user.lastName,
             accountType:user.accountType,
             country:user.country,
             city:user.city,
             available:photographerData.available,
             avatar:photographerData.avatar,
             balance:photographerData.balance
            }
            return {
                ...data
            }        
        }

        public async myProfile(userId: number): Promise<IProfile> {
        const photographerData = await this.photographerRepository.findOneBy({userId})
        const categories = this.prepareArray(photographerData.speciality)
        // const shots = this.prepareArray(photographerData.shots)
        
        const data:IProfile = {
            speciality:categories,
            rating:photographerData.rating,
            jobs:photographerData.jobs,
            amount:photographerData.amount,
            per:photographerData.per,
            currency:photographerData.currency,
            shots:photographerData.shots,
            aboutYou:photographerData.aboutYou,
            portfolio:photographerData.portfolio,
            inProcess:photographerData.inProcess,
            feedbackIds:photographerData.feedbackIds
        }           
        return {...data}
    }
    private prepareArray(str:string){
        const array = str.replace(/[{}"]/g, '').split(',');
        return array
    }

    public async availabitiy(userId:number,bool:boolean){
        await this.changes(userId,{available:bool})        
    }
    public async about(userId:number,text:string){
        await this.changes(userId,{available:text})       
    }
    public async rate(userId:number,cost:string){
        await this.changes(userId,{amount:cost})        
    }
    public async speciality(userId:number,ctg:string[]){
        await this.changes(userId,{speciality:ctg})        
    } 
    public async shots(userId:number,shots:string[]){
        await this.changes(userId,{shots:shots})        
    }
    public async avatar(userId:number,url:string){
        await this.changes(userId,{avatar:url})
    }
    private async changes(userId:number,data:any){
        let photographerData = await this.photographerRepository.findOneBy({userId})
        photographerData = this.photographerRepository.merge(photographerData,data)
        await this.photographerRepository.save(photographerData)      
    }


}