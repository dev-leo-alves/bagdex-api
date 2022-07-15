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


    async create(tier: Tier): Promise<void>{
        const {name, url} = await TierMapper.toPersistence(tier)

        await prisma.tier.create({
            data:{
                name,
                url
            }
        })
    };
}