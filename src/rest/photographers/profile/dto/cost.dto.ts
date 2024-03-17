import { IsNumber } from "class-validator";
import { DtoProperty } from "src/libs";

export class CostDto{
@DtoProperty()
@IsNumber()
cost:string;
}