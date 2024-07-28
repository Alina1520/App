import { Controller, Post } from "@nestjs/common";
import { RestSeedService } from "./seed.service";

@Controller("seed")
export class RestSeedController{
    constructor(private readonly seedService:RestSeedService){}

    @Post("us")
    public async storeUser() {
        return await this.seedService.storeUser()
    }
    @Post("ph")
    public async storePhotographers() {
        return await this.seedService.storePhotographers()
    }
    @Post("j")
    public async storeJobs() {
        return await this.seedService.storeJobs()
    }
    @Post("cl")
    public async storeClients() {
        return await this.seedService.storeClients()
    }
}