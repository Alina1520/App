import { Body, Controller, Get, Post } from "@nestjs/common";
import { RestJobService } from "./job.service";
import { AuthGuard } from "src/domain";
import { AboutDto, AppointmentDto, CRateDto, CategoriesDto, CountMember } from "./dto";
import { ReqUser } from "src/libs";
import { LocationDto, PickupDto, StudioDto } from "src/rest/users";

@Controller("job")
export class RestJobController{
    constructor(private readonly jobService:RestJobService){}

    @Post("type")
    @AuthGuard()
    public async photoType(@Body() dto:CategoriesDto,@ReqUser() id:number){
        await this.jobService.typeOfPhoto(id,dto)
    }
    @Get("place")
    @AuthGuard()
    public async getPlace(@ReqUser() id:number){
        return await this.jobService.getLocation(id)
    }
    @Post("studio")
    @AuthGuard()
    public async needStudio(@Body() dto:StudioDto,@ReqUser() id:number){
        await this.jobService.preferStudio(id,dto)
    }
    @Post("time")
    @AuthGuard()
    public async setData(@Body() dto:AppointmentDto,@ReqUser() id:number){
        await this.jobService.setAppointment(id,dto)
    }
    @Post("price")
    @AuthGuard()
    public async setPrice(@Body() dto:CRateDto,@ReqUser() id:number){
        await this.jobService.setPrice(id,dto)
    }
    @Post("members")
    @AuthGuard()
    public async setMembers(@Body() dto:CountMember,@ReqUser() id:number){
        await this.jobService.membersCount(id,dto)
    }
    @Post("pickup")
    @AuthGuard()
    public async setDelivery(@Body() dto:PickupDto,@ReqUser() id:number){
        await this.jobService.pickup(id,dto)
    }
    @Post("text")
    @AuthGuard()
    public async setDescription(@Body() dto:AboutDto,@ReqUser() id:number){
        await this.jobService.text(id,dto)
    }

}