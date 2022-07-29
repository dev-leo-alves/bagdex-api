import { UseCaseError } from '../../../../../core/domain/errors/use-case-error'

export class TierAlreadyExistsError extends Error implements UseCaseError {
  constructor(name: string) {
    super(`The tier "${name}" is already registered.`)
    this.name = 'TierAlreadyExistsError'
  }
}