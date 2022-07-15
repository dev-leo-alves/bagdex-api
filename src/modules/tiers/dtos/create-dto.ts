import { Either } from "../../../core/shared/either"
import { InvalidNameError } from "../../../core/domain/entities/errors/invalid-name"
import { InvalidUrlError } from "../../../core/domain/entities/errors/invalid-url"
import { Tier } from "../domain/entities/tier"

export type CreateDTO = Either< 
    |InvalidNameError 
    |InvalidUrlError,
    Tier
>