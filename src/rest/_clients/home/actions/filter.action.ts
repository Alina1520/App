import { AccountType, Categories, IPhotographer, IPhotographerRepository, Photographer } from "src/domain";
import * as _ from "lodash";
import { Brackets, SelectQueryBuilder } from "typeorm";

interface Params {
    rating?: number;
    accountType?: AccountType | string;
    studio?: boolean;
    categories?: Categories[] | Categories;
    currency?: string;
    rateFrom?: number;
    rateTo?: number;
    location?: string;
}

export class FilterationAction {
    constructor(private readonly phRepository: IPhotographerRepository) {}
    protected params: Params = {};
    protected qb: SelectQueryBuilder<IPhotographer>;

    public setParams(params: Params) {
        this.params = _.omitBy(params, _.isNil);
        return this;
    }

    protected createQueryBuilder() {
        this.qb = this.phRepository
            .createQueryBuilder("photographer")
            .leftJoinAndSelect('photographer.user', 'user');
        return this;
    }

    protected async useParams() {
        if (this.params.rating && this.params.rating != 0) this.filterByRating();
        if (this.params.accountType && this.params.accountType !== "Both") this.filterByAccountType();
        if (this.params.studio !== undefined) this.filterByStudio();
        if (this.params.categories) this.filterByCategory();
        if (this.params.rateFrom) this.filterByRateFrom();
        if (this.params.rateTo) this.filterByRateTo();
        if (this.params.location) this.filterByLocation();
        // this.filterByAvailable()
        // this.filterByCurrency();
        return this.qb;
    }

    public async get() {
        this.createQueryBuilder();
        return this.useParams();
    }

    protected filterByAvailable(){
        this.qb.andWhere("photographer.available = :av",{av:true})
        return this
    }

    protected filterByRating() {
        const ratings = Array.isArray(this.params.rating) ? this.params.rating : [this.params.rating];
        const conditions: string[] = [];

        ratings.forEach(rating => {
            if (rating === 5) {
                conditions.push('photographer.rating >= 5');
            } else if (rating === 4) {
                conditions.push('photographer.rating >= 4 AND photographer.rating < 5');
            } else if (rating === 3) {
                conditions.push('photographer.rating >= 3 AND photographer.rating < 4');
            } else if(rating === 2){
                conditions.push('photographer.rating >= 2 AND photographer.rating < 3');
            }else{
                conditions.push('photographer.rating < 2');
            }
        });
                
        this.qb.andWhere(new Brackets(qb => {
            conditions.forEach(condition => {
                qb.orWhere(condition);
            });
        }));
        return this;
    }

    protected filterByAccountType() {
        this.qb.andWhere('user.accountType = :type', { type: this.params.accountType });
        return this;
    }

    protected filterByStudio() {
        this.qb.andWhere('photographer.studio = :studio', { studio: this.params.studio });
        return this;
    }

    protected filterByCategory() {
        const categories = Array.isArray(this.params.categories) ? this.params.categories : [this.params.categories];
        this.qb.andWhere('photographer.speciality && ARRAY[:...categories]::varchar[]', { categories });
        return this;
    }

    protected filterByCurrency() {
        this.qb.andWhere('photographer.currency = :currency', { currency: this.params.currency });
        return this;
    }

    protected filterByRateFrom() {
        this.qb.andWhere('photographer.amount >= :rateFrom', { rateFrom: this.params.rateFrom });
        return this;
    }

    protected filterByRateTo() {
        this.qb.andWhere('photographer.amount <= :rateTo', { rateTo: this.params.rateTo });
        return this;
    }

    protected filterByLocation() {
        const city = this.params.location.split(",")[0]
        this.qb.andWhere('user.city = :city', { city });
        return this;
    }
}
