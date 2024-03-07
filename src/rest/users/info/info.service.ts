import { Inject, Injectable } from "@nestjs/common";
import { IUserInfoService, USER_INFO_SERVICE } from "src/domain";
import { AccountTypeDto, GenderDto, LocationDto, PickupDto, RateDto, RoleDto, SpecialityDto, StudioDto, TextDto } from "./dto";

@Injectable()
export class RestUserInfoService{
    @Inject(USER_INFO_SERVICE)
    private readonly infoService:IUserInfoService

    public async addLocation(dto:LocationDto,userId:number){
        await this.infoService.addLocation(dto,userId)
    }
    public async chooseRole(dto:RoleDto,userId:number){
        await this.infoService.chooseRole(dto.role,userId)
    }
    public async chooseGender(dto:GenderDto,userId:number){
        await this.infoService.chooseGender(dto.gender,userId)
    }
    public async chooseType(type:AccountTypeDto,userId:number){
        await this.infoService.accountType(type.type,userId)
    }
    public async specialty(dto:SpecialityDto,userId:number){
        await this.infoService.addCategories(dto.categories,userId)
    }
    public async description(dto:TextDto,userId:number){
        await this.infoService.description(dto.text,userId)
    }
    public async rate(dto:RateDto,userId:number){
        await this.infoService.createRate(dto,userId)
    }
    public async haveStudio(dto:StudioDto,userId:number){
        await this.infoService.haveStudio(dto.studio,userId)
    }
    public async delivery(dto:PickupDto,userId:number){
        await this.infoService.delivery(dto.delivery,userId)
    }

}