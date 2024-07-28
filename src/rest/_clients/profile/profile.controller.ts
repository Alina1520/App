import { Controller, Get } from "@nestjs/common";
import { AuthGuard } from "src/domain";
import { ReqUser } from "src/libs";
import { RestClProfileService } from "./profile.service";

@Controller("client-profile")
export class RestClProfileController{
    constructor(private readonly profileService:RestClProfileService){}
    
    @Get("base")
    @AuthGuard()
    public async getDataProfile(@ReqUser() id:number){
        return await this.profileService.getClientProfileData(id)
    }
}