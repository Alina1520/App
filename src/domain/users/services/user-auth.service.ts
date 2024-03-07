import { BadRequestException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ChangePasswordPayload, CreateUserPayload, IAuthUserService, LoginPayload, USER_REPOSITORY, UserRepository } from "../typing";
import { PasswordService } from "./password.service";

@Injectable()
export class AuthUserService implements IAuthUserService{
    @Inject(USER_REPOSITORY)
    private readonly userRepository:UserRepository
    constructor(private readonly passwordService:PasswordService){}
    public async signUp(payload: CreateUserPayload) {
      const existFName = await this.userRepository.findOneBy({firstName:payload.firstName})
      if(existFName) throw new BadRequestException("First name exists")

      const existEmail = await this.userRepository.findOneBy({email:payload.email})
      if(existEmail) throw new BadRequestException("Email has already exist")
      
      const passwords = this.passwordService.comparePassword(payload.pass,payload.repeatPass)
      if(!passwords) throw new BadRequestException("Passwords are not the same")

      const hashedPass = await this.passwordService.hashPassword(payload.pass)
      
      const user = this.userRepository.create({
          firstName:payload.firstName,
          lastName:payload.lastName,
          email:payload.email,
          hashPassword:hashedPass,
        })
        await this.userRepository.save(user)
        
        return user.id  
        
    }
    public async login(payload: LoginPayload) {
        const user = await this.userRepository.findOneBy({email:payload.email})
        if(!user) throw new UnauthorizedException("Email doesnt exist")
        
        const pass = await this.passwordService.compareHashedPassword(payload.password,user.hashPassword)
        if(!pass) throw new UnauthorizedException("Password is incorrect")
        
        return user.id
    }
    public async forgotPassword(payload:ChangePasswordPayload){
        const user = await this.userRepository.findOneBy({email:payload.email})
        if(!user) throw new UnauthorizedException("Email doesnt exist")
        
        const pass = this.passwordService.comparePassword(payload.pass,payload.repeatPass)
        if(!pass) throw new UnauthorizedException("Passwords are not the same")

        const hashPass = await this.passwordService.hashPassword(payload.pass)
        user.hashPassword = hashPass

        await this.userRepository.save(user)       
    }

    public async getUserById(id:number){
        const user = await this.userRepository.findOneBy({id:id})
        if(!user) throw new BadRequestException()
        return user
    }
}