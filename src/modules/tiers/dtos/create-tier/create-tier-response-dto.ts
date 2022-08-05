import { Either } from "../../../../core/shared/either"
import { InvalidNameError } from "../../../../core/domain/entities/errors/invalid-name"
import { InvalidUrlError } from "../../../../core/domain/entities/errors/invalid-url"
import { TierAlreadyExistsError } from "../../use-cases/errors/tier-already-exists-error"
import { Tier } from "../../domain/entities/tier"
import { InvalidIdError } from "../../../../core/domain/entities/errors/invalid-id"

export type CreateTierResponseDTO = Either< 
    | InvalidIdError
    | InvalidNameError
    | InvalidUrlError
    | TierAlreadyExistsError, 
    Tier
>