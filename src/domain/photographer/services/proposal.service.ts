import { Inject, Injectable } from "@nestjs/common";
import { PROPOSAL_REPOSITORY, ProposalRepository } from "../typing";

@Injectable()
export class ProposalService{
    @Inject(PROPOSAL_REPOSITORY)
    private readonly proposalRepository:ProposalRepository

    public async savingProposalData(jobId:number,dto:any){
            const proposal = await this.proposalRepository.findOneBy({jobId})
    
            const changedData = {...proposal,...dto}
            await this.proposalRepository.save(changedData)
        
    }

    public async createProposalWithData(termsData:any,jobId:number,userId:number){
        try{
            const proposal = this.proposalRepository.create({jobId,userId})
        
            const updatedProposal = {...proposal,...termsData}
            await this.proposalRepository.save(updatedProposal)
        }catch(e){
            console.log(e)
        }
    }
}