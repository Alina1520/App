import { BadRequestException, Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { RestOnBoardingService } from "./on-boarding.service";
import { AccountTypeDto, GenderDto, LocationDto, PickupDto, RateDto, RoleDto, SpecialityDto, StudioDto, TextDto } from "./dto";
import { AuthGuard, RoleGuard, UserRole } from "src/domain";
import { ReqUser } from "src/libs";

@ApiTags("user | info")
@Controller("info")
export class RestOnBoardingController{
    constructor(private readonly onBoardService:RestOnBoardingService){}

    @ApiOperation({ summary: 'Store location of user' })
    @ApiOkResponse({ status: 201, description: 'Location stored successfully' })
    @AuthGuard()
    @Post('location')
    async addLocation(@Body() dto: LocationDto, @ReqUser() id: number) {
        await this.onBoardService.addLocation(dto, id);
    }

    @ApiOperation({ summary: 'Store role' })
    @ApiOkResponse({ status: 201, description: 'Role stored successfully' })
    @AuthGuard()
    @Post('role')
    async chooseRole(@Body() dto: RoleDto, @ReqUser() id: number) {
        await this.onBoardService.chooseRole(dto, id);
    }

    @ApiOperation({ summary: 'Store gender' })
    @ApiOkResponse({ status: 201, description: 'Gender stored successfully' })
    @AuthGuard()
    @Post('gender')
    async chooseGender(@Body() dto: GenderDto, @ReqUser() id: number) {
        await this.onBoardService.chooseGender(dto, id);
    }

    @ApiOperation({ summary: 'Store account type' })
    @ApiOkResponse({ status: 201, description: 'Account type stored successfully' })
    @AuthGuard()
    @Post('type')
    async accountType(@Body() dto: AccountTypeDto, @ReqUser() id: number) {
        await this.onBoardService.chooseType(dto, id);
    }

    @ApiOperation({ summary: 'Store rate' })
    @ApiOkResponse({ status: 201, description: 'Rate stored successfully' })
    @RoleGuard(UserRole.Photographer)
    @AuthGuard()
    @Post('rate')
    async chooseRate(@Body() dto: RateDto, @ReqUser() id: number) {
        await this.onBoardService.saveBoardingDataToPhotographer(dto, id);
    }

    @ApiOperation({ summary: 'Store categories' })
    @ApiOkResponse({ status: 201, description: 'Speciality stored successfully' })
    @RoleGuard(UserRole.Photographer)
    @AuthGuard()
    @Post('speciality')
    async chooseSpeciality(@Body() dto: SpecialityDto, @ReqUser() id: number) {
        await this.onBoardService.saveBoardingDataToPhotographer(dto, id);
    }

    @ApiOperation({ summary: 'Store description of photographer' })
    @ApiOkResponse({ status: 201, description: 'Description stored successfully' })
    @RoleGuard(UserRole.Photographer)
    @AuthGuard()
    @Post('about')
    async writeDescription(@Body() dto: TextDto, @ReqUser() id: number) {
        await this.onBoardService.saveBoardingDataToPhotographer(dto, id);
    }

    @ApiOperation({ summary: 'Store delivery\'s having' })
    @ApiOkResponse({ status: 201, description: 'Delivery option stored successfully' })
    @RoleGuard(UserRole.Photographer)
    @AuthGuard()
    @Post('pickup')
    async chooseIfDelivery(@Body() dto: PickupDto, @ReqUser() id: number) {
        await this.onBoardService.saveBoardingDataToPhotographer(dto, id);
    }

    @ApiOperation({ summary: 'Store studio\'s having' })
    @ApiOkResponse({ status: 201, description: 'Studio option stored successfully' })
    @RoleGuard(UserRole.Photographer)
    @AuthGuard()
    @Post('studio')
    async haveStudio(@Body() dto: StudioDto, @ReqUser() id: number) {
        await this.onBoardService.saveBoardingDataToPhotographer(dto, id);
    }
}