import { Inject, Injectable } from "@nestjs/common";
import { IOnBoardService, LocationPayload,  USER_REPOSITORY, UserRepository, UserRole } from "../typing";
import { IPhotographerRepository, PHOTOGRAPHERS_REPOSITORY } from "src/domain/photographer/typing";
import { CLIENT_REPOSITORY, ClientRepository } from "src/domain/clients";

@Injectable()
export class UserBoardingService implements IOnBoardService{
    @Inject(USER_REPOSITORY)
    private readonly userRepository:UserRepository
    @Inject(PHOTOGRAPHERS_REPOSITORY)
    private readonly photographRepository:IPhotographerRepository
    @Inject(CLIENT_REPOSITORY) 
    private readonly clientRepository:ClientRepository
    
    public async addLocation(payload:LocationPayload,userId:number){
        let user = await this.userRepository.findOneBy({id:userId})
        user = {...user,...payload}

        await this.userRepository.save(user)
    }

    public async saveUserInfo(field: string, value: any, userId: number): Promise<void> {
        let user = await this.userRepository.findOneBy({id:userId});
    
        switch (field) {
            case 'gender':
                user = { ...user, gender: value };
                break;
            case 'role':
                user = {...user,  role: value };
                await this.createUserByRole(value,userId)
                break;
            case 'accountType':
                user = { ...user, accountType: value };
                break;
    
            default:
                throw new Error('Invalid field provided');
        }
    
        await this.userRepository.save(user);
    }

    public async saveDataPhotographer(userId:number,data:any){
        const photographer = await this.photographRepository.findOneBy({userId})
        const newDataPhoto = {...photographer, ...data }
        await this.photographRepository.save(newDataPhoto)      
    }

    private async createUserByRole(role:any,userId:number){
        if(role === UserRole.Client){
            const client = this.clientRepository.create({userId})
            await this.clientRepository.save(client)
        }else{
            const ph = this.photographRepository.create({userId})
            await this.photographRepository.save(ph)
        }
    }


    // private async findPhotographer(userId: number){
    //     let photographer = await this.photographRepository        
    //     .createQueryBuilder("it")
    //     .leftJoinAndSelect("it.user","us")
    //     .where("us.id = :id", { id:userId })
    //     .getOne()

    //     if(!photographer){
    //         const user = await this.userRepository.findOneBy({id:userId})
    //         if(!user) throw new NotFoundException()
    //         photographer = this.photographRepository.create({userId:user.id})
    //     }

    //     return photographer
    // }
}