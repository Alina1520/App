import { Inject, Injectable } from "@nestjs/common";
import { IDateAndTime, IHeaderDescription, IRate, JOB_REPOSITORY, JobRepository } from "../typing";

@Injectable()
export class JobService{
    @Inject(JOB_REPOSITORY)
    private readonly jobRepository:JobRepository

    public async chooseCategory(id:number,data:string){
        const newJob = this.jobRepository.create({userId:id})
        newJob.categories = data
        await this.jobRepository.save(newJob)
    }
    public async getLocation(userId:number){
        const query = await this.jobRepository
        .createQueryBuilder("it")
        .leftJoinAndSelect("it.user","itui")
        .where("itui.id=:id",{id:userId})
        .getOne()
        console.log(query)
        const {city,country} = query.user
        return {
            city,country
        }       
    }
    public async preferStudio(userId:number,data:boolean){
        const query  = await this.jobRepository
        .createQueryBuilder("it")
        .where("it.userId=:userId",{userId})
        .andWhere("it.studio IS NULL ")
        .getOne()

        query.studio = data
        await this.jobRepository.save(query)
    }
    public async dateAndTime(userId:number,data:IDateAndTime){
        let query  = await this.jobRepository
        .createQueryBuilder("it")
        .where("it.userId=:userId",{userId})
        .andWhere("it.duration IS NULL ")
        .getOne()

        query = this.jobRepository.merge(query,{...data})
        await this.jobRepository.save(query)
    } 
    public async setPrice(userId:number,data:IRate){
        let job  = await this.jobRepository
        .createQueryBuilder("it")
        .where("it.userId=:userId",{userId})
        .andWhere("it.amount IS NULL ")
        .getOne()
        job = this.jobRepository.merge(job,{...data})
        await this.jobRepository.save(job)
    }
    public async numberOfMembers(userId:number,count:number){
        const job  = await this.jobRepository
        .createQueryBuilder("it")
        .where("it.userId=:userId",{userId})
        .andWhere("it.participants IS NULL ")
        .getOne()
        job.participants = count
        await this.jobRepository.save(job)       
    }
    public async reqPickup(userId:number,data:boolean){
        const query  = await this.jobRepository
        .createQueryBuilder("it")
        .where("it.userId=:userId",{userId})
        .andWhere("it.pickup IS NULL ")
        .getOne()
        
        query.pickup = data
        await this.jobRepository.save(query)
    }
    public async titleAndDesc(userId:number,data:IHeaderDescription){
        let job  = await this.jobRepository
        .createQueryBuilder("it")
        .where("it.userId=:userId",{userId})
        .andWhere("it.headline IS NULL ")
        .getOne()
        
        job = this.jobRepository.merge(job,{...data})
        await this.jobRepository.save(job)
    }

}