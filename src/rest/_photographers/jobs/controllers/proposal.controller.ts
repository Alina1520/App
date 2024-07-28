import { Controller, Get } from "@nestjs/common";
import { AuthGuard } from "src/domain";
import { RestPhProposalService } from "../services";
import { ReqUser } from "src/libs";

@Controller("proposal")
export class RestPhProposalsController{
    constructor(private readonly proposalService:RestPhProposalService){}

    @Get("active-posts")
    @AuthGuard()
    public async getPosts(@ReqUser() userId:number){
        return await this.proposalService.getActiveProposal(userId)
    }

}