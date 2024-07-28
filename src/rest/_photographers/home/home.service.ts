import { Inject, Injectable } from "@nestjs/common";
import { AccountType, IJob, IPhotographerRepository, IProposalService, JOB_REPOSITORY, JobRepository, Jobs, PHOTOGRAPHERS_REPOSITORY, PROPOSAL_REPOSITORY, PROPOSAL_SERVICE, ProposalRepository, TypePriceEnum, USER_REPOSITORY, UserRepository } from "src/domain";
import { CRateDto, RestJobService } from "src/rest/_clients";
import { FilterDto, LetterFileDto, TermsDto } from "./dto";
import { FilterationAction } from "./actions";
import { formatDistanceToNow } from "date-fns";

@Injectable()
export class RestPhHomeService{
    @Inject(PHOTOGRAPHERS_REPOSITORY)
    private readonly phRepository:IPhotographerRepository

    @Inject(JOB_REPOSITORY)
    private readonly jobRepository:JobRepository

    @Inject(PROPOSAL_REPOSITORY)
    private readonly proposalRepository:ProposalRepository

    @Inject(PROPOSAL_SERVICE)
    private readonly proposalService:IProposalService

public async getMatchedJobs(userId:number){
    const categories = await this.phRepository
    .createQueryBuilder("it")
    .where("it.userId = :userId",{userId})
    .select([
        "it.speciality"
    ])
    .getOne()
    
    const posts = await this.jobRepository
    .createQueryBuilder("it")
    .where("it.category = ANY(:categories)",{categories:categories.speciality})
    .select([
        "it.id",
        "it.location",
        "it.data",
        "it.duration",
        "it.category",
        "it.typePrice",
        "it.currency",
        "it.amount",
        "it.headline",
        "it.description",
        "it.createdAt"
    ])
    .getMany()

    if(posts && posts.length>0){
        return this.addTimeAgoToJobs(posts)
    }
    else{
        return {message:"There is not matched jobs"}
    }
    
}
    public async countJobs(){
        const counts = await new FilterationAction(this.jobRepository)
        .getCount()

        return counts
    }

    public async setFilter(dto:FilterDto){
        const filterAction = await new FilterationAction(this.jobRepository)
        .setParams(dto)
        .get()

        filterAction.select([
            "it.id",
            "it.location",
            "it.data",
            "it.duration",
            "it.category",
            "it.typePrice",
            "it.currency",
            "it.amount",
            "it.headline",
            "it.description",
            "it.createdAt"
        ])

        const filteredJobs = await filterAction.getMany();
    
        if (filteredJobs && filteredJobs.length > 0) {
            return this.addTimeAgoToJobs(filteredJobs)
        } else {
            return 'There are no jobs suitable for your parameters';
        }
    }
    

    public async getTopAgenciesAndPhotographers(accountType:AccountType){
        const queryBuilder = await this.phRepository
        .createQueryBuilder("photographer")
        .leftJoinAndSelect("photographer.user","user")
        .where("user.accountType = :accountType",{accountType})
        .andWhere("photographer.rating >= 4")
        .orderBy("photographer.rating", "DESC")
        .select([ 
            "user.firstName",
            "user.lastName",
            "user.accountType",
            "user.country",
            "user.city",
            "photographer.avatar",
            "photographer.jobs",
            "photographer.rating",
            "photographer.currency",
            "photographer.amount",
            "photographer.per",
            "photographer.shots"
        ])
        .getMany()

        return queryBuilder   
    }

    
    public async getJobDetails(jobId:number){
        const job = await this.jobRepository
        .createQueryBuilder("it")
        .where("it.id = :jobId",{jobId})
        .select([
                "it.id",
                "it.data",
                "it.duration",
                "it.category",
                "it.typePrice",
                "it.amount",
                "it.currency",
                "it.description",
                "it.headline",
                "it.file",
                "it.location",
                "it.createdAt"
        ])
        .getOne()

        const {createdAt,...rest} = job

        return {
                ...rest,
                timeAgo:formatDistanceToNow(new Date(job.createdAt), { addSuffix: true }),
                client:await this.getClientInfo(jobId),
            }
    }

    public async getInfoForSendingProposal(jobId:number,userId:number){
        const jobInfo = await this.getJobInfo(jobId)

        let sum,period
        const proposal = await this.proposalRepository.findOneBy({jobId,userId})

        if(proposal){
            sum = proposal.amount
            period = proposal.duration
        }
        else{
            const {currency,typePrice} = jobInfo
            sum = jobInfo.amount
            period = jobInfo.duration

            const termsData = {
                  currency,
                  amount:sum,
                  duration:period,
                  typePrice
            }
        
            await this.proposalService.createProposalWithData(termsData,jobId,userId)
        
        }

        const {income,fee} = this.calculatePayment(sum,period,jobInfo)

        return {...jobInfo,amount:sum,duration:period,income,fee}
    }

    
    public async savingLetterAndFile(dto:LetterFileDto,jobId:number){
        await this.proposalService.savingProposalData(jobId,dto)
    }
    
    public async changeTerms(jobId:number,dto:TermsDto){
        await this.proposalService.savingProposalData(jobId,dto)
        return {message:"The client will see this in your proposal "}
    }

    
    private addTimeAgoToJobs(jobs:IJob[]){
        return jobs.map(job=>{
            const {createdAt,...rest} = job
            return {
                ...rest,
                timeAgo:formatDistanceToNow(new Date(job.createdAt),{addSuffix:true})
            }
        })
    }
    
    private async getClientInfo(jobId: number) {
        const userId = (await this.jobRepository.findOneBy({ id: jobId })).userId
        
        const clientInfo = await this.jobRepository
        .createQueryBuilder("job")
            .leftJoinAndSelect("job.user", "user")
            .leftJoinAndSelect("user.client", "client")
            .where("user.id = :userId", { userId })
            .getOne();

            const jobs =  await this.jobRepository
            .createQueryBuilder("job")
            .where("job.userId = :userId",{userId})
            .getManyAndCount()
            
            return {
                city: clientInfo.user.city,
                country: clientInfo.user.country,
                hires: clientInfo.user.client.hires,
                rating: clientInfo.user.client.rating,
                spent: clientInfo.user.client.spent,
                jobs:jobs[1]
        };
    }

    private async getJobInfo(jobId:number){
        const jobInfo = await this.jobRepository
        .createQueryBuilder("it")
        .where("it.id = :jobId",{jobId})
        .select([
            "it.location",
            "it.data",
            "it.headline",
            "it.description",
            "it.category",
            "it.duration",
            "it.amount",
            "it.currency",
            "it.typePrice"
        ])
        .getOne()

        return jobInfo
    }
    
    private calculatePayment(sum:number,period:number,jobInfo:Jobs){
        let fee;
        if(jobInfo.typePrice == TypePriceEnum.Hourly){
            fee = sum * period * 10 /100;
        }else{
            fee = sum * 10 / 100;
        }
    
        const income = sum - fee;
        return {income,fee}
    
    }
}