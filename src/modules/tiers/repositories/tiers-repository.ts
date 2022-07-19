import { Tier } from "../domain/entities/tier";

export interface TiersRepository{
    findByName(name: string): Promise<Tier>;
    findById(id: number): Promise<Tier>;
    findAll(): Promise<Tier[]>;
    create(tier: Tier): Promise<void>;
    count(): Promise<number>;
}