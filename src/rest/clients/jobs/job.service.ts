import { Inject, Injectable } from "@nestjs/common";
import { IJobService, JOB_SERVICE } from "src/domain";
import {  AboutDto, AppointmentDto, CRateDto, CategoriesDto, CountMember } from "./dto";
import { PickupDto, RateDto, StudioDto } from "src/rest/users";

@Injectable()
export class RestJobService{
    @Inject(JOB_SERVICE)
    private readonly jobService:IJobService

    public async typeOfPhoto(userId:number,type:CategoriesDto){
        await this.jobService.chooseCategory(userId,type.type)
    }
    public async getLocation(userId:number){
        return await this.jobService.getLocation(userId)
    }
    public async preferStudio(userId:number,studio:StudioDto){
        await this.jobService.preferStudio(userId,studio.studio)
    }
    public async setAppointment(userId:number,dto:AppointmentDto){
        await this.jobService.dateAndTime(userId,{...dto})
    }
    public async setPrice(userId:number,rate:CRateDto){
        await this.jobService.setPrice(userId,{...rate})
    }
    public async membersCount(userId:number,dto:CountMember){
        await this.jobService.numberOfMembers(userId,dto.count)
    }
    public async pickup(userId:number,dto:PickupDto){
        await this.jobService.reqPickup(userId,dto.delivery)
    }
    public async text(userId:number,dto:AboutDto){
        await this.jobService.titleAndDesc(userId,{...dto})
    }
}