import { prisma } from "../../../prisma";
import { TiersRepository } from "./tiers-repository";
import { Tier } from "../domain/entities/tier";
import { TierMapper } from "../mappers/tier-mapper";
import { FindAllTiersDTO } from "../dtos/find-all-tiers/find-all-tiers-dto";

export class PrismaTiersRepository implements TiersRepository{

    async findByName(name: string): Promise<Tier> {
       
        const tier = await prisma.tier.findUnique({
            where: { name },
        })
        
        if(!tier){
            return null
        }

        return TierMapper.toDomain(tier)
    }
 
    async findById(id: number): Promise<Tier> {
        const tier = await prisma.tier.findUnique({
            where: { id },
        })

        if(!tier){
            return null
        }

        return TierMapper.toDomain(tier)
    }

    async findAll(): Promise<FindAllTiersDTO> {
        const count = await prisma.tier.count()
        const tiers  = await prisma.tier.findMany({
            orderBy:{
                id: "asc"
            },
        })
        const tierEntities = tiers.map(tier=> TierMapper.toDomain(tier))

        return {count, tiers: tierEntities}
    }



    async create(tier: Tier): Promise<void>{
        const data = await TierMapper.toPersistence(tier)

        await prisma.tier.create({
            data
        })
    };

    async patch(id: number, tier?: Tier): Promise<void> {
        const data = await TierMapper.toPersistence(tier)
        await prisma.tier.update({
          where: {
            id,
          },
          data
        })
    }

    async count(): Promise<number> {
        
         const counter = await prisma.tier.count()
         console.log(counter)
         return counter
    }
}