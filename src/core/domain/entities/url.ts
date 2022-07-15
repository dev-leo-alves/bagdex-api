import { Either, left, right } from '../../shared/either'
import { InvalidUrlError } from './errors/invalid-url'

export class Url {
  private readonly url: string

  private constructor (url: string) {
    this.url = url
    Object.freeze(this)
  }

  static create (url: string): Either<InvalidUrlError, Url> {
    if (!Url.validate(url)) {
      return left(new InvalidUrlError(url))
    }
    return right(new Url(url))
  }

  get value (): string {
    return this.url
  }

  static validate (url: string): boolean {
    var regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    if (!url) {
      return false
    }
    if (url.length > 256) {
      return false
    }
    if (!regex.test(url)) {
      return false
    }
    return true
  }
}
