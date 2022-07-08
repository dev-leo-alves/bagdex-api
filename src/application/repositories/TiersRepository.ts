import { Tier } from "../../domain/entities/Tier"

export interface TierCreateData{
    name: string;
    url: string;
}
export interface TiersRepository{
    findByName(name: string): Promise<Tier | null>;
    findById(id: string): Promise<Tier | null>;
    create(data: TierCreateData): Promise<Tier | null>;
}