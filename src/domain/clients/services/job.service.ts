import { Inject, Injectable } from "@nestjs/common";
import { CLIENT_REPOSITORY, ClientRepository, IJob, JOB_REPOSITORY, JobRepository } from "../typing";
import { Categories } from "src/domain/photographer";

@Injectable()
export class JobService{
    @Inject(JOB_REPOSITORY)
    private readonly jobRepository:JobRepository
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository:ClientRepository

    public async chooseCategory(id:number,data:Categories){
        const newJob = this.jobRepository.create({userId:id})
        newJob.category = data
        await this.jobRepository.save(newJob)
    }

    public async saveDataForJobs(data:any,job:IJob){
        const newData = {...job,...data}
        await this.jobRepository.save(newData)
    }

}