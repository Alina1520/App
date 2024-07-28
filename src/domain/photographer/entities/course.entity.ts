import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Lesson } from "./lesson.entity";
import { User } from "src/domain/users";
import { ICourse } from "../typing";
import { BoughtCourse } from "./bought-course.entity";

@Entity("course")
export class Course implements ICourse{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'int'})
    userId:number

    @OneToMany(()=>Lesson,ls=>ls.course)
    lesson:Lesson[]

    @ManyToOne(()=>User,us=>us.course,{onDelete:"CASCADE"})
    @JoinColumn({name:'userId'})
    user:User

    @OneToMany(()=>BoughtCourse,bc=>bc.course)
    buyers:BoughtCourse[]

    @Column()
    title:string

    @Column()
    description:string

    @Column({type:'int'})
    amount:number
    
    @Column()
    currency:string

    @Column({nullable:true,default:"0h"})
    duration:string

    @Column({type:"double precision",default:0})
    rating:number

    @Column({type:'int',default:0})
    sales:number

    @Column({default:0})
    earned:number

    @Column({default:false})
    active:boolean

    @Column({type:"int",nullable:true})
    lessons:number

    @Column({type:"int",nullable:true,default:0})
    reviews:number

    @CreateDateColumn({type:"timestamp",default:()=>"LOCALTIMESTAMP"})
    createdAt:Date

    @UpdateDateColumn({type:"timestamp",default:()=>"LOCALTIMESTAMP"})
    updatedAt:Date

}