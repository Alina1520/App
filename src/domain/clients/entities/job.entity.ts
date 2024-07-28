import { Categories, Proposal } from "src/domain/photographer";
import { User } from "src/domain/users";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IJob, TypePriceEnum } from "../typing";
import { Client } from "./profile.entity";

@Entity("jobs")
export class Jobs implements IJob {
    
    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:false,type:"integer"})
    userId:number

    @ManyToOne(()=>User,us=>us.jobs,{onDelete:'CASCADE'})
    @JoinColumn({name:"userId"})
    user:User
    
    // @OneToMany(()=>Client,cl=>cl.jobs)
    // client:Client

    @OneToMany(() => Proposal, proposal => proposal.job)
    proposal: Proposal[]

    @Column({type:"varchar",nullable:true})
    data:Date
    
    @Column({type:"varchar",nullable:true,length:8})
    time: string

    @Column({type:"int",nullable:true})
    duration:number

    @Column({nullable:true,default:false})
    studio:boolean

    @Column({type:"varchar",nullable:true})
    category:Categories

    @Column({nullable:true,default:false})
    asap:boolean

    @Column({type:"varchar",nullable:true})
    typePrice:TypePriceEnum

    @Column({type:"int",nullable:true})
    amount:number

    @Column({type:"varchar",nullable:true})
    currency:string
    
    @Column({type:"int",nullable:true})
    participants:number
    
    @Column({nullable:true})
    pickup:boolean
    
    @Column({type:"varchar",nullable:true})
    description:string
    
    @Column({type:"varchar",nullable:true})
    headline:string
    
    @Column({type:"varchar",nullable:true})
    file:string  

    @Column({type:"varchar",nullable:true})
    location:string  

    @CreateDateColumn({type:"timestamp",default:()=>"LOCALTIMESTAMP"})
    createdAt:Date

    @UpdateDateColumn({type:"timestamp",default:()=>"LOCALTIMESTAMP"})
    updatedAt:Date
}