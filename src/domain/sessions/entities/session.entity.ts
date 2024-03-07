import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("sessions")
export class Session{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    userId:number

    @Column()
    accessToken:string

    @Column()
    refreshToken:string

    @CreateDateColumn({type:"timestamp",default:()=>"LOCALTIMESTAMP"})
    createdAt:Date

    @UpdateDateColumn({type:"timestamp",default:()=>"LOCALTIMESTAMP"})
    updatedAt:Date
}