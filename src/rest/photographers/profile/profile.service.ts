import { Inject, Injectable } from "@nestjs/common";
import { IProfileService, PROFILE_SERVICE } from "src/domain";
import { AvailableDto, AvatarDto, CostDto, ShotsDto } from "./dto";
import { SpecialityDto, TextDto } from "src/rest/users";

@Injectable()
export class RestProfileService{
    @Inject(PROFILE_SERVICE)
    private readonly profileService:IProfileService

    public async getUserData(userId:number){
        return await this.profileService.getPhotographerData(userId)
    }
    public async getProfileData(userId:number){
        return await this.profileService.myProfile(userId)
    }
    public async rateUpdate(userId:number,data:CostDto){
        await this.profileService.rate(userId,data.cost)
    }
    public async speciality(userId:number,data:SpecialityDto){
        await this.profileService.speciality(userId,data.categories)
    }
    public async avatar(userId:number,data:AvatarDto){
        await this.profileService.avatar(userId,data.url)
    }
    public async shots(userId:number,data:ShotsDto){
        await this.profileService.shots(userId,data.urls)
    }
    public async aboutUpdate(userId:number,data:TextDto){
        await this.profileService.about(userId,data.text)
    }
    public async availUpdate(userId:number,data:AvailableDto){
        await this.profileService.availabitiy(userId,data.bool)
    }

}