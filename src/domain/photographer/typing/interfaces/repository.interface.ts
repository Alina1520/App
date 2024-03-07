import { Repository } from "typeorm";
import { Photographer } from "../../entities";

export type IPhotographerRepository = Repository<Photographer>