import { User } from "src/domain/users";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Jobs } from "./job.entity";

@Entity("client")
export class Client{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:"int"})
    userId:number

    @OneToOne(()=>User,user=>user.client,{onDelete:"CASCADE"})
    @JoinColumn({name:"userId"})
    user:User 
    
    // @ManyToOne(()=>Jobs,j=>j.client)
    // @JoinColumn({name:"jobIds"})
    // jobs:Jobs[]

    @Column({nullable:true,default:"https://iabc.bc.ca/wp-content/uploads/2018/05/unknown_profile.png"})
    avatar:string

    @Column({nullable:true,type:"int",default:0})
    balance:number

    @Column({nullable:true,type:"int",default:0})
    hires:number
    
    @Column({nullable:true,type:"int",default:0})
    rating:number

    @Column({nullable:true,type:"int",default:0})
    spent:number

    @CreateDateColumn({type:"timestamp",default:()=>"LOCALTIMESTAMP"})
    createdAt:Date

    @UpdateDateColumn({type:"timestamp",default:()=>"LOCALTIMESTAMP"})
    updatedAt:Date

}