import { CreateTierController } from './create-tier-controller'
import { MissingParamError } from '../../../../core/infra/errors/missing-param-error'
import { ServerError } from '../../../../core/infra/errors/server-error'
import { CreateTier } from '../../use-cases/create-tier/create-tier-use-case'
import { InvalidUrlError } from '../../../../core/domain/entities/errors/invalid-url'
import { InvalidNameError } from '../../../../core/domain/entities/errors/invalid-name'
import { Tier } from '../../domain/entities/tier'
import { InMemoryTiersRepository } from '../../repositories/in-memory-tiers-repository'
import { TiersRepository } from '../../repositories/tiers-repository'

type SutType ={
  tiersRepository: TiersRepository
  createTierStub: CreateTier
  sut: CreateTierController
}

const makeSut = (): SutType => {
    var tiers: Tier[] = []
    const tiersRepository: TiersRepository = new InMemoryTiersRepository(tiers);

    const createTierStub = new CreateTier(tiersRepository)
    const sut = new CreateTierController(createTierStub)

    return {sut, createTierStub, tiersRepository}
}

describe('Create Tier Controller', () => {
  test('should return 400 if no name is provided', async () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        url: 'https://www.validurl.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name').message)
  })

  test('should return 400 if no url is provided', async () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('url').message)
  })

  test('should return 400 if an invalid url is provided', async () => {
    const {sut} = makeSut()
    
    const httpRequest = {
      body: {
        name: "any_name",
        url: "invalid_url",
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidUrlError(httpRequest.body.url).message)
  })

  test('should return 400 if an invalid name is provided', async () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        name: 'O',
        url: 'https://www.validurl.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidNameError(httpRequest.body.name).message)
  })

  test('should return 500 if create tier throws', async () => {
    const {sut, createTierStub} = makeSut()
    jest.spyOn(createTierStub, 'execute').mockImplementation(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'anyName',
        url: 'https://www.anyurl.com'
      }
    }

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toEqual(500)
    expect((response.body as ServerError).message).toEqual('Server error: internal.')
  })

})