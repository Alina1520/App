import { AccountType, Categories } from "src/domain";
import { DtoProperty, DtoPropertyOptional } from "src/libs";

export class FilterDto{
    @DtoPropertyOptional()
    rating: number;
    @DtoPropertyOptional()
    accountType : AccountType | string
    @DtoPropertyOptional()
    studio:boolean
    @DtoPropertyOptional()
    categories:Categories[] | Categories
    @DtoPropertyOptional()
    currency:string
    @DtoPropertyOptional()
    rateFrom:number
    @DtoPropertyOptional()
    rateTo:number    
    @DtoPropertyOptional()
    location:string
    
}
