import { Tier } from "../domain/entities/tier";
import { FindAllTiersDTO } from "../dtos/find-all-tiers/find-all-tiers-dto";

export interface TiersRepository{
    findByName(name: string): Promise<Tier>;
    findById(id: number): Promise<Tier>;
    findAll(): Promise<FindAllTiersDTO>;
    create(tier: Tier): Promise<void>;
    patch(id: number, tier?: Tier): Promise<void>;
}

