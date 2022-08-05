import { Tier } from "../../domain/entities/tier";

export interface FindAllTiersDTO {
    count: number
    tiers: Tier[]
}