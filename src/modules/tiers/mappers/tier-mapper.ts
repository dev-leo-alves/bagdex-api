import { Tier as PersistenceTier } from '@prisma/client'

import { Name } from '../../../core/domain/entities/name'
import { Url } from '../../../core/domain/entities/url'
import { Tier } from '../domain/entities/tier'
import { InvalidNameError } from '../../../core/domain/entities/errors/invalid-name'

export class TierMapper {
  static toDomain(raw: PersistenceTier): Tier {
    const nameOrError = Name.create(raw.name)
    const urlOrError = Url.create(raw.url)

    if (nameOrError.isLeft()) {
      throw new InvalidNameError(raw.name)
    }

    if (urlOrError.isLeft()) {
      throw new InvalidNameError(raw.url)
    }

    const tierOrError = Tier.create(
      {
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
      name: tier.name.value,
      url: tier.url.value,
    }
  }
}