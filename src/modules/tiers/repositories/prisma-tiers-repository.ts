import { prisma } from "../../../prisma";
import { TiersRepository } from "./tiers-repository";
import { Tier } from "../domain/entities/tier";
import { TierMapper } from "../mappers/tier-mapper";

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

    async findAll(): Promise<Tier[]> {
        const tiers = await prisma.tier.findMany({
           orderBy:{
                id: "asc"
           }
        })
        
        return tiers.map(tier=> TierMapper.toDomain(tier))
    }



    async create(tier: Tier): Promise<void>{
        const {id, name, url} = await TierMapper.toPersistence(tier)

        await prisma.tier.create({
            data:{
                id,
                name,
                url
            }
        })
    };

    async count(): Promise<number> {
        return await prisma.tier.count()
    }
}