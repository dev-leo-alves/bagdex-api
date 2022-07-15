import {TiersRepository} from "../../repositories/tiers-repository"
import { CreateTierDTO } from "../../dtos/create-tier-dto"
import { CreateTierResponseDTO } from "../../dtos/create-tier-response-dto"
import { left, right } from "../../../../core/shared/either"
import { Tier } from "../../domain/entities/tier"
import { Name } from "../../../../core/domain/entities/name"
import { Url } from "../../../../core/domain/entities/url"
import { TierAlreadyExistsError } from "./errors/tier-already-exists-erros"

export class CreateTier{
    constructor(private tiersRepository: TiersRepository){}

    async execute({name, url}: CreateTierDTO): Promise<CreateTierResponseDTO> {

        const nameOrError = Name.create(name)
        if (nameOrError.isLeft()) {
            return left(nameOrError.value)
        }

        const urlOrError = Url.create(url)
        if (urlOrError.isLeft()) {
            return left(urlOrError.value)
        }


        const tierOrError = Tier.create({
            name: nameOrError.value,
            url: urlOrError.value
        })


        if(tierOrError.isLeft()){
            return left(tierOrError.value)
        } 

        const tier = tierOrError.value

        const tierExists = await this.tiersRepository.findByName(tier.name.value)

        if(tierExists){
            return left(new TierAlreadyExistsError(tier.name.value))
        }

        await this.tiersRepository.create(tier)

        return right(tier)
    }
}