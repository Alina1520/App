import { Inject, Injectable, Query } from "@nestjs/common";
import { IJob, IJobService, JOB_REPOSITORY, JOB_SERVICE, JobRepository, PROPOSAL_REPOSITORY, ProposalRepository } from "src/domain";
import {  AboutDto, AppointmentDto, CRateDto, CategoriesDto, CountMember, LocationDto } from "./dto";
import { PickupDto, StudioDto } from "src/rest/on-boarding";
import { formatDistanceToNow } from "date-fns";


@Injectable()
export class RestJobService{
    @Inject(JOB_REPOSITORY)
    private readonly jobRepository:JobRepository
    @Inject(JOB_SERVICE)
    private readonly jobService:IJobService
    @Inject(PROPOSAL_REPOSITORY)
    private readonly proposalRepository:ProposalRepository

    public async saveCategoryOfPhoto(userId:number,dto:CategoriesDto){
        await this.jobService.chooseCategory(userId,dto.category)
    }

    public async selectLocation(userId:number,dto:LocationDto){
        await this.saveTargetJob(userId,'city',dto);
    }

    public async preferStudio(userId:number,dto:StudioDto){
        await this.saveTargetJob(userId,'studio',dto)
    }

    public async setAppointment(userId:number,dto:AppointmentDto){
        await this.saveTargetJob(userId,'duration',dto)
    }
    
    public async setPrice(userId:number,rate:CRateDto){
        await this.saveTargetJob(userId,'amount',rate)
    }
    
    public async membersCount(userId:number,dto:CountMember){
        await this.saveTargetJob(userId,'participants',dto)
    }
    
    public async pickup(userId:number,dto:PickupDto){
        await this.saveTargetJob(userId,'pickup',dto)
    }

    public async text(userId:number,dto:AboutDto){
        await this.saveTargetJob(userId,'headline',dto)
    }

    public async getPostings(userId:number){
        const [query,count] = await this.jobRepository
        .createQueryBuilder("it")
        .where("it.userId = :userId",{userId})
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
        .getManyAndCount()
        
        if(query && query.length > 0){

            const postings = await Promise.all(
                query.map(async post=>{
                    const {createdAt,...rest} = post
                    const countProposal = await this.countProposals(post.id)
            return {
                ...rest,
                timeAgo:formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }),
                proposals:countProposal
            }}))

            return {posts:postings,totalPosts:count }  
        }else{
            return "You have no job postings yet"
        }
    }


    public async getPostInformation(postId:number,userId:number){
        const query = await this.jobRepository
        .createQueryBuilder("it")
        .where("it.userId = :userId",{userId})
        .andWhere("it.id = :postId",{postId})
        .select([
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
        .getOne()

        const {createdAt,...rest} = query
        return {...rest,timeAgo:formatDistanceToNow(new Date(query.createdAt),{addSuffix:true})}
    }

    public async getProposals(jobId:number){
        const [proposals,count] = await this.proposalRepository
        .createQueryBuilder("it")
        .leftJoinAndSelect("it.user","us")
        .leftJoinAndSelect("us.photographer","ph")
        .where("it.jobId = :jobId",{jobId})
        .select([
            "it.id",
            "it.amount",
            "it.currency",
            "it.letter",
            "us.firstName",
            "us.lastName",
            "us.city",
            "us.country",
            "us.accountType",
            "ph.rating",
            "ph.jobs",
            "ph.rarity",
            "ph.shots",
            "ph.avatar"
        ])
        .getManyAndCount()

        return {proposals,count}
    }

    public async getProposalDetail(proposalId:number){
        const profile = await this.proposalRepository
        .createQueryBuilder("it")
        .leftJoinAndSelect("it.user","us")
        .leftJoinAndSelect("us.photographer","ph")
        .where("it.id = :proposalId",{proposalId})
        .select([
            "it.id",
            "it.amount",
            "it.currency",
            "it.letter",
            "us.firstName",
            "us.lastName",
            "us.city",
            "us.country",
            "us.accountType",
            "ph.rating",
            "ph.jobs",
            "ph.rarity",
            "ph.shots",
            "ph.avatar",
            "ph.speciality",
            "ph.aboutYou",
            "ph.portfolio"
        ])
        .getOne()

        return profile
        
    }
    
    private async saveTargetJob(userId:number,type:string,dto:any){
        const query  = await this.jobRepository
            .createQueryBuilder("it")
            .where("it.userId=:userId",{userId})
            .andWhere(`it.${type} IS NULL `)
            .getOne()

            await this.jobService.saveDataForJobs({...dto},query)
    }

    private async countProposals(postId:number){
        const countProposal =  await this.proposalRepository
            .createQueryBuilder("it")
            .where("it.jobId = :postId",{postId})
            .getCount()
        return countProposal    
    }
}
