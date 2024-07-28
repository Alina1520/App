import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course.entity";
import { User } from "src/domain/users";

@Entity()
export class BoughtCourse{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    courseId:number

    @Column()
    userId:number

    @ManyToOne(()=>Course,cs=>cs.buyers,{onDelete:"SET NULL"})
    @JoinColumn({name:"courseId"})
    course:Course

    @ManyToOne(()=>User,us=>us.boughtCourses,{onDelete:"CASCADE"})
    @JoinColumn({name:"userId"})
    user:User

    @Column({type:"double precision",nullable:true,default:0})
    rating:number

    @Column({nullable:true})
    text:string

    @Column({nullable:true})
    feedbackTime:string
}