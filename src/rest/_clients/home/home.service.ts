import { Inject, Injectable } from "@nestjs/common";
import { Categories, IPhotographerRepository, JOB_REPOSITORY, JobRepository, PHOTOGRAPHERS_REPOSITORY, USER_REPOSITORY, UserRepository } from "src/domain";
import { CategoryDto, FilterDto } from "./dto";
import { FilterationAction } from "./actions";

@Injectable()
export class RestHomeService{
    @Inject(USER_REPOSITORY) private readonly userRepository:UserRepository

    @Inject(PHOTOGRAPHERS_REPOSITORY) private readonly phRepository:IPhotographerRepository

    // @Inject(JOB_REPOSITORY) private readonly jobRepository:JobRepository

    public async getNameToWelcome(id:number){
        const user = await this.userRepository.findOneBy({id})
        return user.firstName
    }

    public async findPhotographerByCategory(category:CategoryDto){
        const query =  await this.phRepository
        .createQueryBuilder("it")
        .leftJoinAndSelect("it.user","user")
        .where(":category = ANY(it.speciality)", { category: category.category })
        .andWhere("it.available = :available", { available: true })
        .select([
            "user.firstName",
            "user.lastName",
            "user.accountType",
            "user.country",
            "user.city",
            "it.avatar",
            "it.jobs",
            "it.rating",
            "it.currency",
            "it.amount",
            "it.per",
            "it.shots",
            "it.id"
        ])
        .getMany()
         
        if(query && query.length > 0){
            return query
        }else{
            return "There are no users suitable for your parameters "
        }
        
    }

    public async setFilteration(dto: FilterDto) {
        const filterAction = await new FilterationAction(this.phRepository)
            .setParams(dto)
            .get();
    
        filterAction.select([
            'user.firstName',
            'user.lastName',
            'user.accountType',
            'user.city',
            'user.country',
            'photographer.avatar',
            'photographer.jobs',
            'photographer.rating',
            'photographer.currency',
            'photographer.amount',
            'photographer.per',
            'photographer.shots',
            'photographer.id',
        ]);
    
        const filteredPhotographers = await filterAction.getMany();
    
        if (filteredPhotographers && filteredPhotographers.length > 0) {
            return filteredPhotographers;
        } else {
            return 'There are no users suitable for your parameters';
        }
    }
    
    public async getTopPhotographers(){
        const queryBuilder = await this.phRepository
        .createQueryBuilder("photographer")
        .leftJoinAndSelect("photographer.user","user")
        .where("user.accountType = :accountType", { accountType: 'fr' })
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
            "photographer.shots",
            "photographer.id",
        ])
        .getMany()

        return queryBuilder
    }

    // public async invatePhotograph(phId:number,postId:number){
    //     const photographer = await this.phRepository
    //     .createQueryBuilder("it")
    //     .leftJoinAndSelect("it.user","us")
    //     .where("it.id = phId",{phId})
    //     .select([
    //         "us.firstName",
    //         "us.lastName",
    //         "us.city",
    //         "us.country",
    //         "us.accountType",
    //         "it.rarity",
    //         "it.avatar",
    //         "it.rating",
    //         "it.jobs",
    //     ])
    //     .getOne()

    //     const post = await this.jobRepository
    //     .createQueryBuilder("it")
    //     .where("it.id = postId",{postId})
    //     .select([
    //         "it.location",
    //         "it.data",
    //         "it.currency",
    //         "it.amount",
    //         "it.typePrice",
    //         "it.headline",
    //         "it.description",
    //     ])
    //     .getOne()

    //     return {...photographer,...post}
    // }


}    
