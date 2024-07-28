import { Categories, DurationEnum, HiresEnum, RangePriceEnum, TypePriceEnum } from "src/domain";
import { DtoProperty, DtoPropertyOptional } from "src/libs";

export class FilterDto{
    @DtoProperty()
    chronology:string

    @DtoPropertyOptional()
    categories: Categories

    @DtoPropertyOptional()
    typePrice:TypePriceEnum[]
    
    @DtoPropertyOptional()
    rateFrom:number

    @DtoPropertyOptional()
    rateTo:number

    @DtoProperty()
    currency:string

    @DtoPropertyOptional()
    rangePrice:RangePriceEnum[]

    @DtoPropertyOptional()
    hires:HiresEnum[]

    @DtoPropertyOptional()
    duration:DurationEnum[]

    @DtoPropertyOptional()
    location:string

}