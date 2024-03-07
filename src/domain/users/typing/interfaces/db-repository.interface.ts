import { Repository } from "typeorm";
import { User } from "../../entities";

export type UserRepository = Repository<User>