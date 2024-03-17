import { Repository } from "typeorm";
import { Jobs } from "../../entities";

export type JobRepository = Repository<Jobs>