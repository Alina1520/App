import { Categories, DurationEnum, HiresEnum, IJob, JobRepository, RangePriceEnum, TypePriceEnum } from "src/domain";
import * as _ from "lodash";
import { SelectQueryBuilder, Brackets } from "typeorm";
import { formatDistanceToNow } from "date-fns";

interface Params {
    chronology?: string;
    categories?: Categories;
    typePrice?: TypePriceEnum[];
    rateFrom?: number;
    rateTo?: number;
    currency?: string;
    rangePrice?: RangePriceEnum[];
    hires?: HiresEnum[];
    duration?: DurationEnum[];
    location?: string;
}

export class FilterationAction {
    constructor(
        private readonly jobRepository: JobRepository
    ) {}
    protected params: Params = {};
    protected qb: SelectQueryBuilder<IJob>;

    public setParams(params: Params) {
        this.params = _.omitBy(params, _.isNil);
        return this;
    }

    protected createQueryBuilder() {
        this.qb = this.jobRepository
            .createQueryBuilder("it")
            .leftJoinAndSelect("it.user", "us")
            .leftJoinAndSelect("us.client", "cl");
        return this;
    }

    public async getCount(){
        this.createQueryBuilder()
        const countPriceJobs = await this.countJobsByPrice()
        const countHistoryJobs = await this.countJobsByHistory()
        const countDurationJobs = await this.countJobsByDuration()
        return {
            ...countPriceJobs,
            ...countDurationJobs,
            ...countHistoryJobs
        }
    }

    protected async useParams() {
        if (this.params.categories) this.filterByCategories();
        if (this.params.typePrice) this.filterByPriceType();
        if (this.params.rateFrom) this.filterByRateFrom();
        if (this.params.rateTo) this.filterByRateTo();
        if (this.params.hires) this.filterByHires();
        if (this.params.duration) this.filterByDuration();
        if (this.params.rangePrice) this.filterByFixedRange();
        if (this.params.location) this.filterByLocation();
        await this.filterByPeriod()
        this.filterByCurrency();
        return this.qb;
    }

    public async get() {
        this.createQueryBuilder();
        return await this.useParams();
    }

    protected async filterByPeriod() {
        const jobIds = await this.retrieveKeys(this.params.chronology);
    
        this.qb.andWhere("it.id = ANY(:jobIds)", { jobIds });
        return this;
    }
    
    private async retrieveKeys(param: string) {
        const newestKeys: number[] = [];
        const oldestKeys: number[] = [];
        const pattern = /^([5-9]|[1-9]\d+) days ago/;
    
        const timing = await this.qb.select(["it.id", "it.createdAt"]).getMany();
    
        timing.forEach(time => {
            const timeAgo = formatDistanceToNow(new Date(time.createdAt), { addSuffix: true });
            if (pattern.test(timeAgo)) {
                oldestKeys.push(time.id);
            } else {
                newestKeys.push(time.id);
            }
        });
    
        return param === "Newest" ? newestKeys : oldestKeys;
    }

    protected filterByCategories() {
        this.qb.andWhere('it.category = ANY(:categories)', { categories:[this.params.categories] });
        return this;
    }

    protected filterByPriceType() {
        this.qb.andWhere('it.typePrice = ANY(:type)', { type: this.params.typePrice });
        return this;
    }


    protected filterByRateFrom() {
        this.qb.andWhere('it.amount >= :rateFrom', { rateFrom: this.params.rateFrom })
               .andWhere("it.typePrice = :tp", { tp: TypePriceEnum.Hourly });
        return this;
    }

    protected filterByRateTo() {
        this.qb.andWhere('it.amount <= :rateTo', { rateTo: this.params.rateTo })
               .andWhere("it.typePrice = :tp", { tp: TypePriceEnum.Hourly });
        return this;
    }

    protected filterByCurrency() {
        this.qb.andWhere('it.currency = :currency', { currency: this.params.currency });
        return this;
    }

    private convertIntoArray(data:any){
        const result = Array.isArray(data) ? data : [data];
        return result
    }

    protected filterByFixedRange() {
        const ranges = this.convertIntoArray(this.params.rangePrice);
        
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
        
        this.qb.andWhere("it.typePrice = :tp", { tp: TypePriceEnum.Fixed })
            .andWhere(new Brackets(qb => {
                conditions.forEach(condition => {
                    qb.orWhere(condition);
                       });
            }));

        return this;
    }

    protected filterByHires() {
        const conditions: string[] = [];
        const hires = this.convertIntoArray(this.params.hires);

        hires.forEach(hr => {
            if (hr === HiresEnum.No) {
                conditions.push("cl.hires < 1");
            } else if (hr === HiresEnum.OneToNine) {
                conditions.push("cl.hires >= 1 AND cl.hires <= 9");
            } else {
                conditions.push("cl.hires >= 10");
            }
        });

            this.qb.andWhere(new Brackets(qb => {
                conditions.forEach(condition => {
                    qb.orWhere(condition);
                });
            }));
        

        return this;
    }

    protected filterByDuration() {
        const conditions: string[] = [];
        const periods = this.convertIntoArray(this.params.duration);

        periods.forEach(pr => {
            if (pr === DurationEnum.LessTwo) {
                conditions.push("it.duration < 2");
            } else if (pr === DurationEnum.TwoToFive) {
                conditions.push("it.duration >= 2 AND it.duration < 5");
            } else if (pr === DurationEnum.FiveToTen) {
                conditions.push("it.duration >= 5 AND it.duration < 10");
            } else {
                conditions.push("it.duration >= 10");
            }
        });

            this.qb.andWhere(new Brackets(qb => {
                conditions.forEach(condition => {
                    qb.orWhere(condition);
                });
            }));
        

        return this;
    }

    protected filterByLocation() {
        this.qb.andWhere('it.location = :location', { location: this.params.location });
        return this;
    }

    protected async countJobsByPrice(){
       const hourlyJobs = await this.qb
       .where("it.typePrice = :tp",{tp:TypePriceEnum.Hourly})
       .getManyAndCount() 

       const fixedJobs = await this.qb
       .where("it.typePrice = :tp",{tp:TypePriceEnum.Fixed})
       .getManyAndCount() 
       
       const lessFiveH = await this.qb
       .where("it.amount < 500")
       .getManyAndCount()

       const fiveHToOneTh = await this.qb
       .where("it.amount >= 500 AND it.amount < 1000")
       .getManyAndCount() 

       const oneThToFiveTh = await this.qb
       .where("it.amount >= 1000 AND it.amount < 5000")
       .getManyAndCount()

       const fivePlus = await this.qb
       .where("it.amount >= 5000")
       .getManyAndCount() 
   
       return {
        hourlyJobs:hourlyJobs[1],
        fixedJobs:fixedJobs[1],
        lessFiveH:lessFiveH[1],
        fiveHToOneTh:fiveHToOneTh[1],
        oneThToFiveTh:oneThToFiveTh[1],
        fivePlus:fivePlus[1]
       }
    }

    protected async countJobsByHistory(){
        const noneHistory = await this.qb
       .where("cl.hires < 1")
       .getManyAndCount()

        const oneToNineHistory = await this.qb
       .where("cl.hires >=1 AND cl.hires <= 9")
       .getManyAndCount() 

        const tenPlusHistory = await this.qb
       .where("cl.hires >= 10")
       .getManyAndCount() 
       
       return {
           noneHistory:noneHistory[1],
           oneToNineHistory:oneToNineHistory[1],
           tenPlusHistory:tenPlusHistory[1]
        }
    }
    
    protected async countJobsByDuration(){
        const lessTwoDuration = await this.qb
       .where("it.duration < 2")
       .getManyAndCount() 

        const twoToFiveDuration = await this.qb
       .where("it.duration >= 2 AND it.duration < 5")
       .getManyAndCount() 

        const fiveToTenDuration = await this.qb
       .where("it.duration >= 5 AND it.duration < 10")
       .getManyAndCount() 

        const tenPlusDuration = await this.qb
       .where("it.duration >= 10")
       .getManyAndCount() 

       return {
        lessTwoDuration:lessTwoDuration[1],
        twoToFiveDuration:twoToFiveDuration[1],
        fiveToTenDuration:fiveToTenDuration[1],
        tenPlusDuration:tenPlusDuration[1]
       }
    }
}
