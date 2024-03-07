import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common"
import { AuthGuard, RolesGuard } from "../guards"

export const RoleGuard = (role:string)=>(
    applyDecorators(SetMetadata('role',role),UseGuards(RolesGuard))
)
