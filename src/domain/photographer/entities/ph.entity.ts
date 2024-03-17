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

    @Column({nullable:true,default:"Clients will see the near your profile in search results"})
    shots:string

    @Column({nullable:true,default:"Portfolio works will be shown here"})
    portfolio:string
    
    @Column({nullable:true,default:"Work history will be shown here"})
    feedbackIds:string

    @Column({nullable:true,default:0})
    inProcess:number

    @Column({nullable:true})
    aboutYou:string

    @Column({nullable:true,default:0})
    jobs:number;

    @Column({nullable:true,default:0})
    rating:number

    @Column({nullable:true,default:0})
    balance:number

    @Column({nullable:true,default:true})
    available:boolean

    @Column({nullable:true,default:"https://iabc.bc.ca/wp-content/uploads/2018/05/unknown_profile.png"})
    avatar:string

    @CreateDateColumn({type:"timestamp",default:()=>"LOCALTIMESTAMP"})
    createdAt:Date

    @UpdateDateColumn({type:"timestamp",default:()=>"LOCALTIMESTAMP"})
    updatedAt:Date
}