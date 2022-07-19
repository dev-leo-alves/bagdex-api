import { DomainError } from "../../errors/domain-error" 

export class InvalidIdError extends Error implements DomainError {
    constructor (id: number) {
      super(`The Id "${id}" is invalid.`)
      this.name = 'InvalidIdError'
    }
  }