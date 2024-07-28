import { Body, Controller, Get, Query } from "@nestjs/common";
import { RestHomeService } from "./home.service";
import { AuthGuard, Categories } from "src/domain";
import { ReqUser } from "src/libs";
import { CategoryDto, FilterDto } from "./dto";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";

@Controller("home-cl")
export class RestHomeController{
    constructor(private readonly homeService:RestHomeService){}

    @ApiOperation({ summary: 'Get user name to welcome message' })
    @ApiOkResponse({ description: 'Returns the name for the welcome message', status: 200 })
    @Get('welcome')
    @AuthGuard()
    public async getNameToWelcome(
        @ReqUser() id: number
    ) {
        return await this.homeService.getNameToWelcome(id);
    }

    @ApiOperation({ summary: 'Find photographers by category' })
    @ApiOkResponse({ description: 'Returns photographers matching the specified category', status: 200 })
    @Get('find-photographer')
    @AuthGuard()
    public async findPhotographer(
        @Body() category: CategoryDto
    ) {
        return await this.homeService.findPhotographerByCategory(category);
    }

    @ApiOperation({ summary: 'Get top photographers' })
    @ApiOkResponse({ description: 'Returns the top photographers', status: 200 })
    @Get('top-photographers')
    @AuthGuard()
    public async getTopPhotographers() {
        return await this.homeService.getTopPhotographers();
    }
    @Get("set-filter")
    // @AuthGuard()
    public async setFilteration(
        @Query() dto:FilterDto
    ){
        return await this.homeService.setFilteration(dto)
    }
}

