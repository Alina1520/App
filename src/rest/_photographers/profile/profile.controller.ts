import { Body, Controller, Get, Put } from "@nestjs/common";
import { RestProfileService } from "./profile.service";
import { AuthGuard } from "src/domain";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ReqUser } from "src/libs";
import { AvailableDto, AvatarDto, CostDto, ShotsDto } from "./dto";
import { SpecialityDto, TextDto } from "src/rest/on-boarding/on-boarding";

@ApiTags("photographers profile")
@Controller("ph-profile")
export class RestProfileController{
    constructor(private readonly profileService:RestProfileService){}

    @ApiOperation({ summary: 'Get base photographer information' })
    @ApiOkResponse({
        status: 200,
        description: 'Returns base photographer information'
    })
    @Get('base-profile')
    @AuthGuard()
    public async getBasePhotographerInfo(
        @ReqUser() id: number
    ) {
        return await this.profileService.getPhotographerData(id);
    }

    @ApiOperation({ summary: 'Get photographer profile' })
    @ApiOkResponse({
        status: 200,
        description: 'Returns photographer profile'
    })
    @Get('my-profile')
    @AuthGuard()
    public async getPhotographerProfile(
        @ReqUser() id: number
    ) {
        return await this.profileService.getProfile(id);
    }

    @ApiOperation({ summary: 'Update rate information' })
    @ApiOkResponse({
        status: 200,
        description: 'Rate information updated successfully'
    })
    @Put('rate')
    @AuthGuard()
    public async updateRate(
        @ReqUser() id: number,
        @Body() data: CostDto
    ) {
        await this.profileService.updateProfileData(id, data);
    }

    @ApiOperation({ summary: 'Update description' })
    @ApiOkResponse({
        status: 200,
        description: 'Description updated successfully'
    })
    @Put('about')
    @AuthGuard()
    public async updateDescription(
        @ReqUser() id: number,
        @Body() data: TextDto
    ) {
        await this.profileService.updateProfileData(id, data);
    }

    @ApiOperation({ summary: 'Update availability information' })
    @ApiOkResponse({
        status: 200,
        description: 'Availability information updated successfully'
    })
    @Put('availability')
    @AuthGuard()
    public async updateAvailability(
        @ReqUser() id: number,
        @Body() data: AvailableDto
    ) {
        await this.profileService.updateProfileData(id, data);
    }

    @ApiOperation({ summary: 'Update shots' })
    @ApiOkResponse({
        status: 200,
        description: 'Shots updated successfully'
    })
    @Put('shots')
    @AuthGuard()
    public async updateShots(
        @ReqUser() id: number,
        @Body() data: ShotsDto
    ) {
        await this.profileService.updateProfileData(id, data);
    }

    @ApiOperation({ summary: 'Update avatar' })
    @ApiOkResponse({
        status: 200,
        description: 'Avatar updated successfully'
    })
    @Put('avatar')
    @AuthGuard()
    public async updateAvatar(
        @ReqUser() id: number,
        @Body() data: AvatarDto
    ) {
        await this.profileService.updateProfileData(id, data);
    }

    @ApiOperation({ summary: 'Update speciality information' })
    @ApiOkResponse({
        status: 200,
        description: 'Speciality information updated successfully'
    })
    @Put('speciality')
    @AuthGuard()
    public async updateSpeciality(
        @ReqUser() id: number,
        @Body() data: SpecialityDto
    ) {
        await this.profileService.updateProfileData(id, data);
    }
    // @Put(":type")
    // @AuthGuard()
    // public async updateProfileData(@ReqUser() id:number, @Body() data:any, @Param("type") type:string){
    //     const dtoMapping :{[key:string]:any} = {
    //       'rate': CostDto,
    //       'about': TextDto,
    //       'avail': AvailableDto,
    //       'shots': ShotsDto,
    //       'avatar': AvatarDto,
    //       'speciality': SpecialityDto
    //     }

    //     const DtoClass = dtoMapping[type]
    //     if(!DtoClass){
    //         throw new BadRequestException('Invalid profile update type');
    //     }
    //     const validateData = await validate(data,DtoClass)

    //     await this.profileService.updateProfileData(id,validateData)
    // }
}