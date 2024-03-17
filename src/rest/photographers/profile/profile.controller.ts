import { Body, Controller, Get, Put } from "@nestjs/common";
import { RestProfileService } from "./profile.service";
import { AuthGuard } from "src/domain";
import { ApiTags } from "@nestjs/swagger";
import { ReqUser } from "src/libs";
import { AvailableDto, AvatarDto, CostDto, ShotsDto } from "./dto";
import { SpecialityDto, TextDto } from "src/rest/users";

@ApiTags("photographers profile")
@Controller("ph-profile")
export class RestProfileController{
    constructor(private readonly profileService:RestProfileService){}
    @Get("profile")
    @AuthGuard()
    public async getUserData(@ReqUser() id:number){
        return await this.profileService.getUserData(id)
    }
    @Get("my-profile")
    @AuthGuard()
    public async getUserProfile(@ReqUser() id:number){
        return await this.profileService.getProfileData(id)
    }
    @Put("rate")
    @AuthGuard()
    public async rateChanges(@ReqUser() id:number,@Body() data:CostDto){
        await this.profileService.rateUpdate(id,data)
    }
    @Put("about")
    @AuthGuard()
    public async TextChanges(@ReqUser() id:number,@Body() data:TextDto){
        await this.profileService.aboutUpdate(id,data)
    }
    @Put("avail")
    @AuthGuard()
    public async availChanges(@ReqUser() id:number,@Body() data:AvailableDto){
        await this.profileService.availUpdate(id,data)
    }
    @Put("shots")
    @AuthGuard()
    public async shotsChanges(@ReqUser() id:number,@Body() data:ShotsDto){
        await this.profileService.shots(id,data)
    }
    @Put("avatar")
    @AuthGuard()
    public async avatarChanges(@ReqUser() id:number,@Body() data:AvatarDto){
        await this.profileService.avatar(id,data)
    }
    @Put("speciality")
    @AuthGuard()
    public async specChanges(@ReqUser() id:number,@Body() data:SpecialityDto){
        await this.profileService.speciality(id,data)
    }



}