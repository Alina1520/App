import { User } from "src/domain/users";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("photographers")
export class Photographer{
    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:false})
    userId:number

    @Column({nullable:true})
    speciality:string

    @Column({nullable:true})
    amount:number

    @Column({nullable:true})
    per:string

    @Column({nullable:true})
    currency:string

    @Column({nullable:true})
    studio:boolean

    @Column({nullable:true})
    delivery:boolean

    @Column({nullable:true})
    shots:string

    @Column({nullable:true})
    aboutYou:string

    @CreateDateColumn({type:"timestamp",default:()=>"LOCALTIMESTAMP"})
    createdAt:Date

    @UpdateDateColumn({type:"timestamp",default:()=>"LOCALTIMESTAMP"})
    updatedAt:Date
}