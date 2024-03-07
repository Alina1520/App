import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { AccountType, Gender, IUserInfoService, LocationPayload, RatePayload, USER_REPOSITORY, UserRepository, UserRole } from "../typing";
import { IPhotographerRepository, PHOTOGRAPHERS_REPOSITORY } from "src/domain/photographer/typing";

@Injectable()
export class UserInfoService implements IUserInfoService{
    @Inject(USER_REPOSITORY)
    private readonly userRepository:UserRepository
    @Inject(PHOTOGRAPHERS_REPOSITORY)
    private readonly photographRepository:IPhotographerRepository
    
    public async addLocation(payload:LocationPayload,userId:number){
        let user = await this.userRepository.findOneBy({id:userId})
        
        const data = this.userRepository.create({
            ...payload
        })
        user = this.userRepository.merge(user,data)
        await this.userRepository.save(user)
    }
    public async chooseGender(gender:Gender,userId:number): Promise<void> {
        let user = await this.userRepository.findOneBy({id:userId})
        if(gender==="f"){
            user = this.userRepository.merge(user,{gender:Gender.Female})
        }else if(gender==="m"){
            user = this.userRepository.merge(user,{gender:Gender.Male})
        }else{
            throw new BadRequestException(`There is no such gender like ${gender}`)
        }
        await this.userRepository.save(user)       
    }
    
    public async chooseRole(role: UserRole.Client | UserRole.Photographer,userId:number): Promise<void> {
        let user = await this.userRepository.findOneBy({id:userId})
        if(role==="cl"){
            user = this.userRepository.merge(user,{role:UserRole.Client})
        }else if(role==="ph"){
            user = this.userRepository.merge(user,{role:UserRole.Photographer})
        }else{
            throw new BadRequestException(`There is no such role like ${role}`)
        }
        await this.userRepository.save(user)       
        
    }

    public async accountType(type:AccountType,userId:number): Promise<void> {
        let user = await this.userRepository.findOneBy({id:userId})
        if(type==="a"){
            user = this.userRepository.merge(user,{accountType:AccountType.Agency})
        }else if(type==="fr"){
            user = this.userRepository.merge(user,{accountType:AccountType.Freelancer})
        }else{
            throw new BadRequestException(`There is no such account type like ${type}`)
        }
        await this.userRepository.save(user)       
    }

    public async addCategories(categories: string[], userId: number): Promise<void> {
        await this.dataFill(userId,{speciality:categories})
    }
    
    public async delivery(delivery: boolean,userId:number): Promise<void> {
        await this.dataFill(userId,{delivery:delivery})
    }

    public async haveStudio(studio: boolean,userId:number): Promise<void> {
        await this.dataFill(userId,{studio:studio})
    }
    
    public async description(text: string,userId:number): Promise<void> {
        await this.dataFill(userId,{aboutYou:text})   
    }

    public async createRate(rate: RatePayload, userId: number): Promise<void> {
        await this.dataFill(userId,{...rate})          
    }

    private async dataFill(userId:number,data:any){
        let photographer = await this.photographerId(userId)
        photographer = this.photographRepository.merge(photographer,data)
        await this.photographRepository.save(photographer)      
    }

    private async photographerId(userId: number){
        let photographer = await this.photographRepository.findOneBy({userId:userId})
        console.log("s",photographer)
        console.log(userId)
        if(!photographer){
            const user = await this.userRepository.findOneBy({id:userId})
            if(!user) throw new BadRequestException()
            photographer = this.photographRepository.create({userId:userId})
        }
        return photographer
    }
}