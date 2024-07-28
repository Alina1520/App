import { Categories } from "src/domain";
import { DtoProperty } from "src/libs";

export class CategoryDto{
    @DtoProperty()
    category:Categories
}