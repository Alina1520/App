export interface IProposalService{
    savingProposalData(jobId:number,dto:any):Promise<void>
    createProposalWithData(termsData:any,jobId:number,userId:number):Promise<void>
} 