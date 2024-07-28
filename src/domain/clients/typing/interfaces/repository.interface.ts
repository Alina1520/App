import { Repository } from "typeorm";
import { Client, Jobs } from "../../entities";

export type JobRepository = Repository<Jobs>
export type ClientRepository = Repository<Client>