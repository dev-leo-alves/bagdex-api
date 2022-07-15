import { TiersRepository } from "./tiers-repository";
import { Tier } from "../domain/entities/tier";

export class InMemoryTiersRepository implements TiersRepository{
    constructor(public items: Tier[] = []) {}
   
    async findByName(name: string): Promise<Tier> {
      return this.items.find(tier => tier.name.value === name);
    }

    async findById(id: number): Promise<Tier> {
      return this.items.find(tier => tier.id === id);
    }

    async create(tier: Tier): Promise<void> {
      this.items.push(tier)
    }

   
}