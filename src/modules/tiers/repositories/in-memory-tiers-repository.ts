import { TiersRepository } from "./tiers-repository";
import { Tier } from "../domain/entities/tier";
import { FindAllTiersDTO } from "../dtos/find-all-tiers/find-all-tiers-dto";
export class InMemoryTiersRepository implements TiersRepository{
    constructor(public items: Tier[] = []) {}
   
    async findByName(name: string): Promise<Tier> {
      return this.items.find(tier => tier.name.value === name);
    }

    async findById(id: number): Promise<Tier> {
      return this.items.find(tier => tier.id === id);
    }

    async findAll(): Promise<FindAllTiersDTO> {
      return {
        count: this.items.length,
        tiers: this.items
      }
    }

    async create(tier: Tier): Promise<void> {
      this.items.push(tier)
    }

    async patch(id: number, tier?: Tier): Promise<void> {
      const itemId = this.items.findIndex(tierIndex => tierIndex.id === tier.id);
      this.items[itemId] = tier
    }


   
}