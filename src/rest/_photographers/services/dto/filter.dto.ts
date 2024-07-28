import { RangePriceEnum, RarityEnum } from "src/domain";
import { DtoProperty, DtoPropertyOptional } from "src/libs";

export class FilterDto{
    @DtoPropertyOptional()
    price:RangePriceEnum

    @DtoPropertyOptional()
    chronology: string;

    @DtoPropertyOptional()
    rating:number

    @DtoPropertyOptional()
    rarity:RarityEnum
}