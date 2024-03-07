import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AccountType, Gender, UserRole } from "../typing/enum";
import { Photographer } from "src/domain/photographer";

@Entity("users")
export class User{
  @PrimaryGeneratedColumn()
  id:number;ПП

  @Column({type:"varchar",unique:true,nullable:false})
  firstName:string;
  
  @Column({type:"varchar",unique:true,nullable:false})
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