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
        const tierNameExists = await this.tiersRepository.findByName(name)

        if(tierNameExists){
            throw new Error("Tier already exists.")
        }
        const tier = await this.tiersRepository.create({
            name, 
            url
        })

        return tier
    }
}