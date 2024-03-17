import { User } from "src/domain/users";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("jobs")
export class Jobs{
    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:false,type:"integer"})
    userId:number

    @ManyToOne(()=>User,us=>us.jobs,{onDelete:'CASCADE'})
    @JoinColumn({name:"userId"})
    user:User

    @Column({type:"varchar",nullable:true})
    data:Date
    
    @Column({type:"varchar",nullable:true,length:8})
    time: string

    @Column({type:"int",nullable:true})
    duration:number

    @Column({nullable:true})
    studio:boolean

    @Column({type:"varchar",nullable:true})
    categories:string

    @Column({nullable:true,default:false})
    asap:boolean

    @Column({type:"varchar",nullable:true})
    typePrice:string

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
}