import { prisma } from "../../../prisma";
import { TierCreateData, TiersRepository } from "../TiersRepository";
import { Tier } from "../../../domain/entities/Tier";

export class PrismaTiersRepository implements TiersRepository{

    async create({ name, url }: TierCreateData): Promise<Tier | null>{
        const tier = await prisma.tier.create({
            data: {
                name,
                url,                
            }
        })

       return null
    };

    async findByName(name: string): Promise<Tier | null> {
        const tier = await prisma.tier.findUnique({
            where: {
              name: name,
            },
        })
 
        if(!tier){
           return null;
        }
 
        return null
     }
 
    async findById(id: string): Promise<Tier | null> {

        const tier = await prisma.tier.findUnique({
            where: {
                id: Number(id),
            },
        })

        if(!tier){
            return null;
        }
        
        return null
    }
}