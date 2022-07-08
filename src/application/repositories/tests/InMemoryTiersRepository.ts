import { TiersRepository, TierCreateData } from "../TiersRepository";
import { Tier } from "../../../domain/entities/Tier";

export class InMemoryTiersRepository implements TiersRepository{
    public items: Tier[] = [];
   
    async create({name, url}: TierCreateData): Promise<Tier | null> {
      const tier = await Tier.create({
        name,
        url
      })

      return tier;
    }

    async findByName(name: string): Promise<Tier | null> {
       const tier = await this.items.find(tier => tier.props.name === name);

       if(!tier){
          return null;
       }

       return tier

    }

    async findById(id: string): Promise<Tier | null> {
      const tier = await this.items.find(tier => tier.id === id);

      if(!tier){
        return null;
      }

      return tier;
    }


   
}