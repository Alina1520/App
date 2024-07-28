import { User } from "src/domain/users";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Categories, IPhotographer, RarityEnum } from "../typing";

@Entity("photographers")
export class Photographer implements IPhotographer{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    userId:number

    @OneToOne(()=>User,user=>user.photographer,{onDelete:"CASCADE"})
    @JoinColumn({name:"userId"})
    user:User

    @Column({type: 'varchar',nullable:true,array:true})
    speciality:Categories[]

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

    @Column({nullable:true,array:true})
    shots:string

    @Column({nullable:true,array:true})
    portfolio:string
    
    @Column({nullable:true})
    feedbackIds:string

    @Column({nullable:true})
    aboutYou:string

    @Column({nullable:true,default:0})
    jobs:number;

    @Column({nullable:true,default:0,type:"double precision"})
    rating:number

    @Column({nullable:true,default:0})
    balance:number

    @Column({nullable:true,default:true})
    available:boolean

    @Column({nullable:true,default:"https://iabc.bc.ca/wp-content/uploads/2018/05/unknown_profile.png"})
    avatar:string

    @Column({default:false})
    tick:boolean

    @Column({nullable:true})
    rarity: RarityEnum 

    @CreateDateColumn({type:"timestamp",default:()=>"LOCALTIMESTAMP"})
    createdAt:Date

    @UpdateDateColumn({type:"timestamp",default:()=>"LOCALTIMESTAMP"})
    updatedAt:Date
}