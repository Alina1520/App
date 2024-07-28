import { formatDistanceToNow } from "date-fns";
import * as _ from "lodash"
import { CourseRepository, ICourse, RangePriceEnum, RarityEnum } from "src/domain";
import { Brackets, SelectQueryBuilder } from "typeorm";

interface Params{
    chronology?: string;
    rating?:number
    rarity?:RarityEnum
    price?:RangePriceEnum
}

export class FilterationAction {
    constructor(
        private readonly courseRepository: CourseRepository,
        userId: number,
        purchasedIds:number[]
    ) {
        this.purchasedIds = purchasedIds;
        this.userId = userId;
    }
    protected params: Params = {};
    protected qb: SelectQueryBuilder<ICourse>;
    protected userId:number
    protected purchasedIds:number[]

    public setParams(params: Params) {
        this.params = _.omitBy(params, _.isNil);
        return this;
    }

    public async get() {
        const courses = await this.createQueryBuilder().getMany()
        return courses.length > 0 ? await this.useParams() : null
    }

    public async getCounts(){
        this.createQueryBuilder()
        return await this.countCoursesByPrice()
    }

    protected createQueryBuilder(){
        this.qb = this.courseRepository
        .createQueryBuilder("it")
        .leftJoinAndSelect("it.user", "us")
        .leftJoinAndSelect("us.photographer", "ph")
        .andWhere("it.userId != :userId", { userId:this.userId })

        if (this.purchasedIds.length > 0){
            this.qb.andWhere("it.id NOT IN (:...ids)", { ids: this.purchasedIds })
        }

        return this.qb
    }

    protected async useParams() {
        await this.filterByPeriod()
        if(this.params.price) this.filterByPriceRange()
        if(this.params.rarity) this.filterByRarity()
        if(this.params.rating && this.params.rating !== 0) this.filterByRating()
        return this.qb;
    }

    protected async filterByPeriod() {
        const coursesIds = await this.retrieveKeys(this.params.chronology);
           
        this.qb.andWhere("it.id = ANY(:coursesIds)", { coursesIds });
        return this;
    }

    protected  filterByPriceRange(){
        const ranges = this.convertIntoArray(this.params.price);
        
        const conditions: string[] = [];

        ranges.forEach(range => {
            if (range === RangePriceEnum.LessFiveH) {
                conditions.push('it.amount < 500');
            } else if (range === RangePriceEnum.FiveHToOneTh) {
                conditions.push('it.amount >= 500 AND it.amount < 1000');
            } else if (range === RangePriceEnum.OneThToFiveTh) {
                conditions.push('it.amount >= 1000 AND it.amount < 5000');
            } else {
                conditions.push('it.amount >= 5000');
            }
        });
        
        this.qb.andWhere(new Brackets(qb => {
                conditions.forEach(condition => {
                    qb.orWhere(condition);
            });
        }));

        return this;
    }

    protected filterByRarity(){
        const rarities = this.convertIntoArray(this.params.rarity);
        this.qb.andWhere("ph.rarity = ANY(:rarities)",{rarities})
        
        return this;
    }

    protected filterByRating(){
        const ratings = this.convertIntoArray(this.params.rating)
        const conditions: string[] = [];
        console.log("r ",ratings)

        ratings.forEach(rating => {
            const numericRating = Number(rating);
            if (numericRating === 5) {
                conditions.push('it.rating >= 5');
            } else if (numericRating === 4) {
                conditions.push('it.rating >= 4 AND it.rating < 5');
            } else if (numericRating === 3) {
                conditions.push('it.rating >= 3 AND it.rating < 4');
            } else if (numericRating === 2){
                conditions.push('it.rating >= 2 AND it.rating < 3');
            } else {
                conditions.push('it.rating < 2');
            }
        });
                
        console.log("cond ",conditions)
        this.qb.andWhere(new Brackets(qb => {
            conditions.forEach(condition => {
                qb.orWhere(condition);
            });
        }));
        return this;
    }

    private async getCountByCondition(condition:string){
        const query = this.qb.clone()
        const counts = await query.andWhere(condition).getCount()
        return counts
    }

    protected async countCoursesByPrice(){         
       return {
        lessFiveH:await this.getCountByCondition("it.amount < 500"),
        fiveHToOneTh:await this.getCountByCondition("it.amount >= 500 AND it.amount < 1000"),
        oneThToFiveTh:await this.getCountByCondition("it.amount >= 1000 AND it.amount < 5000"),
        fivePlus:await this.getCountByCondition("it.amount >= 5000")
       }
    }

    private convertIntoArray(data:any){
        const result = Array.isArray(data) ? data : [data];
        return result
    }
    
    private async retrieveKeys(param: string) {
        const newestKeys: number[] = [];
        const oldestKeys: number[] = [];
        const pattern = /^([5-9]|[1-9]\d+) days ago/;
    
        const timing = await this.qb.getMany();
            timing.forEach(time => {

            const createdAtDate = new Date(time.createdAt);
            if (isNaN(createdAtDate.getTime())) {
                console.warn(`Invalid date value: ${time.createdAt}`);
                return;
            }

            const timeAgo = formatDistanceToNow(createdAtDate, { addSuffix: true });
            if (pattern.test(timeAgo)) {
                oldestKeys.push(time.id);
            } else {
                newestKeys.push(time.id);
            }
        });
    
        return param === "Newest" ? newestKeys : oldestKeys
    } 

    
}