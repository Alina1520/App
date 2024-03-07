import { UserRole } from "src/domain";
import { DtoProperty } from "src/libs";

export class RoleDto{
    @DtoProperty()
    role:UserRole.Client | UserRole.Photographer
}