import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RestJobService } from "./job.service";
import { AuthGuard } from "src/domain";
import { AboutDto, AppointmentDto, CRateDto, CategoriesDto, CountMember, LocationDto } from "./dto";
import { ReqUser } from "src/libs";
import { PickupDto, StudioDto } from "src/rest/on-boarding";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";


@ApiTags("client-job")
@Controller("job")
export class RestJobController{
    constructor(private readonly jobService:RestJobService){}

    @ApiOkResponse({
        status:201,
        description:"User choose category for job"
    })
    @Post("type")
    @AuthGuard()
    public async setPhotoCategory(@Body() dto:CategoriesDto,@ReqUser() id:number){
        await this.jobService.saveCategoryOfPhoto(id,dto)
    }
    
    @ApiOkResponse({
        status:201,
        description:"User set location for shoots"
    })
    @Post("place")
    @AuthGuard()
    public async selectPlace(@ReqUser() id:number,@Body() dto:LocationDto){
        return await this.jobService.selectLocation(id,dto)
    }
    
    @ApiOkResponse({
        status: 201,
        description: 'User set preference for studio'
    })
    @Post('studio')
    @AuthGuard()
    public async needStudio(
        @Body() dto: StudioDto,
        @ReqUser() id: number
    ) {
        await this.jobService.preferStudio(id, dto);
    }

    @ApiOkResponse({
        status: 201,
        description: 'User set appointment data'
    })
    @Post('time')
    @AuthGuard()
    public async setData(
        @Body() dto: AppointmentDto,
        @ReqUser() id: number
    ) {
        await this.jobService.setAppointment(id, dto);
    }

    @ApiOkResponse({
        status: 201,
        description: 'User set pricing details'
    })
    @Post('price')
    @AuthGuard()
    public async setPrice(
        @Body() dto: CRateDto,
        @ReqUser() id: number
    ) {
        await this.jobService.setPrice(id, dto);
    }

    @ApiOkResponse({
        status: 201,
        description: 'User set number of members'
    })
    @Post('members')
    @AuthGuard()
    public async setMembers(
        @Body() dto: CountMember,
        @ReqUser() id: number
    ) {
        await this.jobService.membersCount(id, dto);
    }

    @ApiOkResponse({
        status: 201,
        description: 'User set delivery preferences'
    })
    @Post('pickup')
    @AuthGuard()
    public async setDelivery(
        @Body() dto: PickupDto,
        @ReqUser() id: number
    ) {
        await this.jobService.pickup(id, dto);
    }

    @ApiOkResponse({
        status: 201,
        description: 'User set job description'
    })
    @Post('text')
    @AuthGuard()
    public async setDescription(
        @Body() dto: AboutDto,
        @ReqUser() id: number
    ) {
        await this.jobService.text(id, dto);
    }

    @ApiOkResponse({
        status: 200,
        description: 'Get all job postings for the user'
    })
    @Get('postings')
    @AuthGuard()
    public async getPostings(
        @ReqUser() id: number
    ) {
        return await this.jobService.getPostings(id);
    }

    @ApiOkResponse({
        status: 200,
        description: 'Get information about a specific job post'
    })
    @Get('post-info/:postId')
    @AuthGuard()
    public async getPostInfo(
        @ReqUser() id: number,
        @Param('postId') postId: number
    ) {
        return await this.jobService.getPostInformation(postId, id);
    }

    // @ApiOkResponse({
    //     status: 200,
    //     description: 'Get information about a specific job post'
    // })
    @Get('proposals/:jobId')
    @AuthGuard()
    public async getProposals(
        @Param('jobId') jobId: number
    ) {
        return await this.jobService.getProposals(jobId);
    }

    @Get('proposal-detail/:prId')
    @AuthGuard()
    public async getProposalDetail(
        @Param('prId') prId: number
    ) {
        return await this.jobService.getProposalDetail(prId);
    }
}