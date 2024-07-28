import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Course } from "./course.entity";
import { CompletedLessons } from "./lessons-completed.entity";

@Entity("lessons")
export class Lesson{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'int'})
    courseId:number

    @ManyToOne(()=>Course,cs=>cs.lesson,{onDelete:"CASCADE"})
    @JoinColumn({name:"courseId"})
    course:Course
    
    @OneToMany(() => CompletedLessons, cl => cl.lesson)
    completed: CompletedLessons[]

    @Column()
    title:string

    @Column()
    description:string

    @Column()
    duration:string

    @Column({nullable:true,default:null})
    videoFile:string

    @CreateDateColumn({type:"timestamp",default:()=>"LOCALTIMESTAMP"})
    createdAt:Date

    @UpdateDateColumn({type:"timestamp",default:()=>"LOCALTIMESTAMP"})
    updatedAt:Date
}