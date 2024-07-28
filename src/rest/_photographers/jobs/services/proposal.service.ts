import { Inject, Injectable } from "@nestjs/common";
import { IPhotographerRepository, JOB_REPOSITORY, JobRepository, PHOTOGRAPHERS_REPOSITORY } from "src/domain";

@Injectable()
export class RestPhProposalService{
    @Inject(JOB_REPOSITORY)
    private readonly jobRepository:JobRepository

    @Inject(PHOTOGRAPHERS_REPOSITORY)
    private readonly phRepository:IPhotographerRepository

    public async getActiveProposal(userId:number){
        const categories = await this.phRepository
        .createQueryBuilder("it")
        .where("it.userId = :userId",{userId})
        .select([
            "it.speciality"
        ])
        .getOne()

        const [posts,count] = await this.jobRepository
        .createQueryBuilder("it")
        .where("it.category = ANY(:categories)",{categories:categories.speciality})
        .select([
            "it.id",
            "it.headline",
            "it.createdAt",
        ])
        .getManyAndCount()

        const formattedPosts = posts.map(post=>({
            ...post,
            createdAt:new Date(post.createdAt).toLocaleDateString('en-US',{
                month:"short",
            })
        }))

        return { posts: formattedPosts, totalPosts: count };

    }




}