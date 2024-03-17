import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { RestUserInfoService } from "./info.service";
import { AccountTypeDto, GenderDto, LocationDto, PickupDto, RateDto, RoleDto, SpecialityDto, StudioDto, TextDto } from "./dto";
import { AuthGuard, RoleGuard, UserRole } from "src/domain";
import { ReqUser } from "src/libs";

@ApiTags("user | info")
@Controller("info")
export class RestUserInfoController{
    constructor(private readonly infoService:RestUserInfoService){}
    @ApiOkResponse({
        status:201,
        description:"Store location of user"
    })
    @AuthGuard()
    @Post("location")
    public async addLocation(@Body() dto:LocationDto,@ReqUser() id:number){
        await this.infoService.addLocation(dto,id)
    }
    @ApiOkResponse({
        status:201,
        description:"Store role"
    })
    @AuthGuard()
    @Post("role")
    public async chooseRole(@Body() dto:RoleDto,@ReqUser() id:number){
        await this.infoService.chooseRole(dto,id)
    }

    @ApiOkResponse({
        status:201,
        description:"Store gender"
    })
    @AuthGuard()
    @Post("gender")
    public async chooseGender(@Body() dto:GenderDto,@ReqUser() id:number){
        await this.infoService.chooseGender(dto,id)
    }
    @ApiOkResponse({
        status:201,
        description:"Store account type"
    })
    @AuthGuard()
    @Post("type")
    public async accountType(@Body() dto:AccountTypeDto,@ReqUser() id:number){
        await this.infoService.chooseType(dto,id)
    }
    
    @ApiOkResponse({
        status:201,
        description:"Store speciality"
    })
    @RoleGuard(UserRole.Photographer)
    @AuthGuard()
    @Post("speciality")
    public async speciality(@Body() dto:SpecialityDto,@ReqUser() id:number){
        await this.infoService.specialty(dto,id)
    }
    
    @ApiOkResponse({
        status:201,
        description:"Store rate"
    })
    @RoleGuard(UserRole.Photographer)
    @AuthGuard()
    @Post("rate")
    public async rate(@Body() dto:RateDto,@ReqUser() id:number){
        await this.infoService.rate(dto,id)
    }
    @ApiOkResponse({
        status:201,
        description:"Store description of photographer"
    })
    @RoleGuard(UserRole.Photographer)
    @AuthGuard()
    @Post("about")
    public async description(@Body() dto:TextDto,@ReqUser() id:number){
        await this.infoService.description(dto,id)
    }
    
    @ApiOkResponse({
        status:201,
        description:"Store delivery`s having"
    })
    @RoleGuard(UserRole.Photographer)
    @AuthGuard()
    @Post("pickup")
    public async delivery(@Body() dto:PickupDto,@ReqUser() id:number){
        await this.infoService.delivery(dto,id)
    }

    @ApiOkResponse({
        status:201,
        description:"Store studio`s having"
    })
    @RoleGuard(UserRole.Photographer)
    @AuthGuard()
    @Post("studio")
    public async haveStudio(@Body() dto:StudioDto,@ReqUser() id:number){
        await this.infoService.haveStudio(dto,id)
    }
}