import { TiersRepository } from "../../../repositories/tiers-repository"
import { left, right } from "../../../../../core/shared/either"
import { Tier } from "../../../domain/entities/tier"
import { Name } from "../../../../../core/domain/entities/name"
import { Url } from "../../../../../core/domain/entities/url"
import { Id } from "../../../../../core/domain/entities/id"
import { UpdateTierResponseDTO } from "../../../dtos/update-tier/update-tier-response-dto"
import { TierNotFoundError } from "../../errors/tier-not-found-error"
import { UpdateTierRequestDTO } from "../../../dtos/update-tier/update-tier-request-dto"
import { RawTierDTO } from "../../../dtos/raw-tier-dto"

export class UpdateTier {
    constructor(private tiersRepository: TiersRepository) { }

    async execute({ tierId, data }: UpdateTierRequestDTO): Promise<UpdateTierResponseDTO> {
        const tierIdNumber = parseInt(tierId)
        let tierHolder: any = {};

        const tierExists = await this.tiersRepository.findById(tierIdNumber)
        if (!tierExists) {
            return left(new TierNotFoundError())
        }

        Object.keys(tierExists.props).forEach((key: any) => {
            tierHolder[key] = tierExists.props[key as keyof RawTierDTO].value
        })

        Object.keys(data).forEach((key: any) => {
            if (data[key as keyof RawTierDTO]) {
                tierHolder[key] = data[key as keyof RawTierDTO];
            }
        })

        const idOrError = Id.create(tierHolder.id)
        if (idOrError.isLeft()) {
            return left(idOrError.value)
        }

        const nameOrError = Name.create(tierHolder.name)
        if (nameOrError.isLeft()) {
            return left(nameOrError.value)
        }


        const urlOrError = Url.create(tierHolder.url)
        if (urlOrError.isLeft()) {
            return left(urlOrError.value)
        }


        const tierOrError = Tier.create({
            id: idOrError.value,
            name: nameOrError.value,
            url: urlOrError.value
        })


        if (tierOrError.isLeft()) {
            return left(tierOrError.value)
        }


        const tier = tierOrError.value

        await this.tiersRepository.patch(tierIdNumber, tier)

        return right(tier)
    }
}