import { TiersRepository } from "../application/repositories/TiersRepository";
import { Tier } from "../domain/entities/Tier";

export class InMemoryTiersRepository implements TiersRepository{
    public items: Tier[] = [];
   
    async findByName(name: string): Promise<Tier | null> {
       const tier = this.items.find(tier => tier.props.name === name);

       if(!tier){
          return null;
       }

       return tier

    }

    async findById(id: string): Promise<Tier | null> {
      const tier = this.items.find(tier => tier.id === id);

      if(!tier){
        return null;
      }

      return tier;
    }
   
}