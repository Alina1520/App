import { Repository } from "typeorm";
import { BoughtCourse, CompletedLessons, Course, Lesson, Photographer, Proposal } from "../../entities";

export type IPhotographerRepository = Repository<Photographer>
export type ProposalRepository = Repository<Proposal>

export type CourseRepository = Repository<Course>
export type LessonRepository = Repository<Lesson>

export type CompletedLessonsRepository = Repository<CompletedLessons>
export type BoughtRepository = Repository<BoughtCourse>