import { Inject, Injectable } from "@nestjs/common";
import { AccountType, Gender, IOnBoardService, USER_BOARD_SERVICE, UserRole } from "src/domain";
import { AccountTypeDto, GenderDto, LocationDto, PickupDto, RateDto, RoleDto, SpecialityDto, StudioDto, TextDto } from "./dto";

@Injectable()
export class RestOnBoardingService{
    @Inject(USER_BOARD_SERVICE)
    private readonly onBoardService:IOnBoardService

    public async addLocation(dto:LocationDto,userId:number){
        await this.onBoardService.addLocation({...dto},userId)   
    }
    public async chooseRole(dto:RoleDto,userId:number){  
        await this.onBoardService.saveUserInfo('role',dto.role,userId);
    }
    public async chooseGender(dto:GenderDto,userId:number){
        await this.onBoardService.saveUserInfo('gender',dto.gender,userId);
    }
    public async chooseType(dto:AccountTypeDto,userId:number){
        await this.onBoardService.saveUserInfo('accountType',dto.type,userId);
    }
    public async saveBoardingDataToPhotographer(dto:RateDto | TextDto | SpecialityDto | StudioDto | PickupDto,userId:number){
        await this.onBoardService.saveDataPhotographer(userId,{...dto}) 
    }

}