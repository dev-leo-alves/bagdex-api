import { Either } from "../../../../core/shared/either"
import { InvalidNameError } from "../../../../core/domain/entities/errors/invalid-name"
import { InvalidUrlError } from "../../../../core/domain/entities/errors/invalid-url"
import { Tier } from "../../domain/entities/tier"
import { InvalidIdError } from "../../../../core/domain/entities/errors/invalid-id"
import { TierNotFoundError } from "../../use-cases/errors/tier-not-found-error"

export type UpdateTierResponseDTO = Either< 
    |InvalidIdError
    |InvalidNameError 
    |InvalidUrlError
    |TierNotFoundError,
    Tier
>