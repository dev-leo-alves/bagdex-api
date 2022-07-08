import { Tier } from "../../../domain/entities/Tier";
import {TiersRepository} from "../../repositories/TiersRepository"
 
type CreateTierRequest={
    name: string;
    url: string;
}

export class CreateTier{
    constructor(
        private tiersRepository: TiersRepository,
    ){}

    async execute({name, url}: CreateTierRequest){
        const tierExist = await this.tiersRepository.findByName(name)

        if(tierExist){
            throw new Error("Tier already exists.")
        }

        const tier = Tier.create({
            name,
            url
        })

        return tier
    }
}