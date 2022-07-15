import { DomainError } from "../../errors/domain-error" 

export class InvalidUrlError extends Error implements DomainError {
    constructor (url: string) {
      super(`The url "${url}" is invalid.`)
      this.name = 'InvalidUrlError'
    }
}