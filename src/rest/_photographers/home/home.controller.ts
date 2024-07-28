import { Body, Controller, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { RestPhHomeService } from "./home.service";
import { AccountType, AuthGuard } from "src/domain";
import { ReqUser } from "src/libs";
import { FilterDto, LetterFileDto, TermsDto } from "./dto";

@Controller("home-ph")
export class RestPhHomeController{
    constructor(private readonly homeService:RestPhHomeService){}

    @Get("jobs")
    @AuthGuard()
    public async getMatchedJobs(@ReqUser() userId:number){
        return await this.homeService.getMatchedJobs(userId)
    }
    

    @Get("count")
    public async countJobs(){
        return this.homeService.countJobs()
    }

    @Get("filter")
    @AuthGuard()
    public async filterJobs(@Query() dto:FilterDto){
        return this.homeService.setFilter(dto)
    }

    @Get("top/:accType")
    @AuthGuard()
    public async getTopAgenciesAndPhotographers(@Param("accType") accType:AccountType){
        return await this.homeService.getTopAgenciesAndPhotographers(accType)
    }

    @Get("job-detail/:jobId")
    @AuthGuard()
    public async getJobDetails(@Param("jobId") jobId:number){
        return await this.homeService.getJobDetails(jobId)
    }

    @Get("proposal/:jobId")
    @AuthGuard()
    public async getInfoForSendingProposal(@Param("jobId") jobId:number,@ReqUser() userId:number){
        return await this.homeService.getInfoForSendingProposal(jobId,userId)
    }
    
    @Post("letter-file/:jobId")
    @AuthGuard()
    public async savingLetterAndFile(@Body() dto:LetterFileDto,@Param("jobId") jobId:number){
        return await this.homeService.savingLetterAndFile(dto,jobId)
    }

    @Patch("terms/:jobId")
    @AuthGuard()
    public async changeTerms(@Param("jobId") jobId:number,@Body() dto:TermsDto){
        return await this.homeService.changeTerms(jobId,dto)
    }



   
}




