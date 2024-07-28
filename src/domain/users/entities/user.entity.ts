import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AccountType, Gender, UserRole } from "../typing/enum";
import { BoughtCourse, CompletedLessons, Course, Photographer, Proposal } from "src/domain/photographer";
import { Client, Jobs } from "src/domain/clients";

@Entity("users")
export class User{
  @PrimaryGeneratedColumn()
  id:number;

  @OneToOne(()=>Photographer,ph=>ph.user)
  photographer: Photographer

  @OneToOne(()=>Client,cl=>cl.user)
  client: Client

  @OneToMany(() => Proposal, proposal => proposal.user)
  proposals: Proposal[];

  @OneToMany(() => Course, cs => cs.user)
  course: Course[]

  @OneToMany(() => CompletedLessons, cl => cl.user)
  completed: CompletedLessons[]

  @OneToMany(() => BoughtCourse, (bc) => bc.user)
  boughtCourses: BoughtCourse[]

  @OneToMany(()=>Jobs,job=>job.user)
  jobs:Jobs[]

  @Column({type:"varchar",nullable:false})
  firstName:string;
  
  @Column({type:"varchar",nullable:false})
  lastName:string;

  @Column({type:"varchar",unique:true,nullable:false})
  email:string;
  
  @Column({type:"varchar",nullable:false})
  hashPassword:string;
  
  @Column({type:"varchar",nullable:true})
  country:string
  
  @Column({type:"varchar",nullable:true})
  city:string
  
  @Column({type:"varchar",nullable:true})
  latitude:string
  
  @Column({type:"varchar",nullable:true})
  longitude:string
  
  @Column({nullable:true})
  gender: Gender

  @Column({nullable:true})
  role:UserRole

  @Column({nullable:true})
  accountType:AccountType
  
  @CreateDateColumn({type:"timestamp",default:()=>"LOCALTIMESTAMP"})
  createdAt:Date

  @UpdateDateColumn({type:"timestamp",default:()=>"LOCALTIMESTAMP"})
  updatedAt:Date  
}