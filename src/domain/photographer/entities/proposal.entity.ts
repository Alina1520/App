import { Jobs } from "src/domain/clients";
import { User } from "src/domain/users";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("proposal")
export class Proposal{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:"int",unique:false})
    jobId:number

    @Column({type:"int",unique:false})
    userId:number

    @ManyToOne(() => Jobs, job => job.proposal, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'jobId' })
    job: Jobs

    @ManyToOne(() => User, user => user.proposals)
    @JoinColumn({ name: 'userId' })
    user: User

    @Column({type:'varchar',length:160,nullable:true})
    letter:string
    
    @Column({type:"int"})
    duration:number

    @Column({type:"varchar"})
    typePrice:string

    @Column({type:"int"})
    amount:number

    @Column({type:"varchar"})
    currency:string

    @Column({type:"varchar",nullable:true})
    file:string

    @CreateDateColumn({type:"timestamp",default:()=>"LOCALTIMESTAMP"})
    createdAt:Date

    @UpdateDateColumn({type:"timestamp",default:()=>"LOCALTIMESTAMP"})
    updatedAt:Date

}