import { UseCaseError } from '../../../../core/domain/errors/use-case-error'

export class TierNotFoundError extends Error implements UseCaseError {
  constructor() {
    super(`Tier was not found.`)
    this.name = 'TierNotFoundError'
  }
}