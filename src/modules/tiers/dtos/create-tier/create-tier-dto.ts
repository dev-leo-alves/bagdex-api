import { Either } from "../../../../core/shared/either"
import { InvalidNameError } from "../../../../core/domain/entities/errors/invalid-name"
import { InvalidUrlError } from "../../../../core/domain/entities/errors/invalid-url"
import { Tier } from "../../domain/entities/tier"
import { InvalidIdError } from "../../../../core/domain/entities/errors/invalid-id"

export type CreateTierDTO = Either< 
    |InvalidIdError
    |InvalidNameError 
    |InvalidUrlError,
    Tier
>