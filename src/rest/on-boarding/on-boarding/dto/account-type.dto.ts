import { AccountType } from "src/domain";
import { DtoProperty } from "src/libs";

export class AccountTypeDto{
    @DtoProperty()
    type:AccountType
}