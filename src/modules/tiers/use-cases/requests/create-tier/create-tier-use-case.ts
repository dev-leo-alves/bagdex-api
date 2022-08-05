import {TiersRepository} from "../../../repositories/tiers-repository"
import { RawTierDTO } from "../../../dtos/raw-tier-dto"
import { CreateTierResponseDTO } from "../../../dtos/create-tier/create-tier-response-dto"
import { left, right } from "../../../../../core/shared/either"
import { Tier } from "../../../domain/entities/tier"
import { Name } from "../../../../../core/domain/entities/name"
import { Url } from "../../../../../core/domain/entities/url"
import { TierAlreadyExistsError } from "../../errors/tier-already-exists-error"
import { Id } from "../../../../../core/domain/entities/id"
import { urlGenerator } from "../../../../../utils/url-generator"
export class CreateTier{
    constructor(private tiersRepository: TiersRepository){}

    async execute({id, name}: RawTierDTO): Promise<CreateTierResponseDTO> {
       
        const idOrError = Id.create(id)

        if (idOrError.isLeft()) {
            return left(idOrError.value)
        }

        const nameOrError = Name.create(name)
        if (nameOrError.isLeft()) {
            return left(nameOrError.value)
        }


        const url = urlGenerator({
            id: id, 
            moduleName:"tier"
        })

        const urlOrError = Url.create(url)
        if (urlOrError.isLeft()) {
            return left(urlOrError.value)
        }


        const tierOrError = Tier.create({
            id: idOrError.value,
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