import { Either, left, right } from '../../shared/either'
import { InvalidIdError } from './errors/invalid-id'

export class Id {
  private readonly id: number

  private constructor (id: number) {
    this.id = id
    Object.freeze(this)
  }

  static create (id: number): Either<InvalidIdError, Id> {
    if (!Id.validate(id)) {
      return left(new InvalidIdError(id))
    }
    return right(new Id(id))
  }

  get value (): number {
    return this.id
  }

  static validate (id: number): boolean {
    if (!id || id < 1) {
      return false
    }
    return true
  }
}