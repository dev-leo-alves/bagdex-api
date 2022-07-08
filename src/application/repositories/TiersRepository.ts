import { Tier } from "../../domain/entities/Tier"

export interface TiersRepository{
    findByName(name: string): Promise<Tier | null>;
    findById(id: string): Promise<Tier | null>;
}