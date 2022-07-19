import { Tier as PersistenceTier } from '@prisma/client'

import { Name } from '../../../core/domain/entities/name'
import { Url } from '../../../core/domain/entities/url'
import { Id } from '../../../core/domain/entities/id'
import { Tier } from '../domain/entities/tier'
import { InvalidNameError } from '../../../core/domain/entities/errors/invalid-name'
import { InvalidIdError } from '../../../core/domain/entities/errors/invalid-id'

export class TierMapper {
  static toDomain(raw: PersistenceTier): Tier {
    const nameOrError = Name.create(raw.name)
    const urlOrError = Url.create(raw.url)
    const idOrError = Id.create(raw.id)


    if (nameOrError.isLeft()) {
      throw new InvalidNameError(raw.name)
    }

    if (urlOrError.isLeft()) {
      throw new InvalidNameError(raw.url)
    }

    
    if (idOrError.isLeft()) {
      throw new InvalidIdError(raw.id)
    }

    const tierOrError = Tier.create(
      {
        id: idOrError.value,
        name: nameOrError.value,
        url: urlOrError.value,

      },
    )

    if (tierOrError.isRight()) {
      return tierOrError.value
    }

    return null
  }

  static async toPersistence(tier: Tier) {
    return {
      id: tier.id,
      name: tier.name.value,
      url: tier.url.value,
    }
  }
}