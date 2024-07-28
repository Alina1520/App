import { DynamicModule, Global, Module } from "@nestjs/common";
import { BOUGHT_REPOSITORY, COMPLETED_LESSONS_REPOSITORY, COURSE_REPOSITORY, COURSE_SERVICE, LESSON_REPOSITORY, PHOTOGRAPHERS_REPOSITORY, PROFILE_SERVICE, PROPOSAL_REPOSITORY, PROPOSAL_SERVICE } from "./typing";
import { provClass, provEntity } from "src/libs";
import { BoughtCourse, CompletedLessons, Course, Lesson, Photographer, Proposal } from "./entities";
import { CourseService, ProfileService, ProposalService } from "./services";

@Module({})
export class PhotographerModule{
    static getroviders(){
        return [
            provEntity(PHOTOGRAPHERS_REPOSITORY,Photographer),
            provEntity(PROPOSAL_REPOSITORY,Proposal),
            provEntity(COURSE_REPOSITORY,Course),
            provEntity(LESSON_REPOSITORY,Lesson),
            provEntity(COMPLETED_LESSONS_REPOSITORY,CompletedLessons),
            provEntity(BOUGHT_REPOSITORY,BoughtCourse),
            provClass(PROFILE_SERVICE,ProfileService),
            provClass(PROPOSAL_SERVICE,ProposalService),
            provClass(COURSE_SERVICE,CourseService),
        ]
    }

    static getExports(){
        return [
            PHOTOGRAPHERS_REPOSITORY,
            PROFILE_SERVICE,
            PROPOSAL_REPOSITORY,
            PROPOSAL_SERVICE,
            COURSE_REPOSITORY,
            COURSE_SERVICE,
            LESSON_REPOSITORY,
            COMPLETED_LESSONS_REPOSITORY,
            BOUGHT_REPOSITORY
        ]
    }

    static forRoot():DynamicModule{
        return {
            module:PhotographerModule,
            providers:PhotographerModule.getroviders(),
            exports:PhotographerModule.getExports(),
        }
    }
    static forFeature():DynamicModule{
        return {
            module:PhotographerModule,
            providers:PhotographerModule.getroviders(),
            exports:PhotographerModule.getExports(),
        }
    }

}