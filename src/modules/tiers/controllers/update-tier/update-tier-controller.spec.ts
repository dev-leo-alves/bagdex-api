import { CreateTierController } from './update-tier-controller'
import { MissingParamError } from '../../../../core/infra/errors/missing-param-error'
import { ServerError } from '../../../../core/infra/errors/server-error'
import { CreateTier } from '../../use-cases/create-tier/create-tier-use-case'
import { InvalidNameError } from '../../../../core/domain/entities/errors/invalid-name'
import { Tier } from '../../domain/entities/tier'
import { InMemoryTiersRepository } from '../../repositories/in-memory-tiers-repository'
import { TiersRepository } from '../../repositories/tiers-repository'
import {HttpErrorResponse} from "../../../../core/infra/http/http-response"
import { InvalidIdError } from '../../../../core/domain/entities/errors/invalid-id'

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
        id: 1
      }
    }
    const httpError: HttpErrorResponse = await sut.handle(httpRequest)
    expect(httpError.statusCode).toBe(400)
    expect(httpError.body.error).toEqual(new MissingParamError('name').message)
  })

  test('should return 400 if no id is provided', async () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name'
      }
    }
    const httpError: HttpErrorResponse = await sut.handle(httpRequest)
    expect(httpError.statusCode).toBe(400)
    expect(httpError.body.error).toEqual(new MissingParamError('id').message)
  })

  test('should return 400 if an invalid id is provided', async () => {
    const {sut} = makeSut()
    
    const httpRequest = {
      body: {
        id: -1,
        name: "any_name",
      }
    }

    const httpError: HttpErrorResponse = await sut.handle(httpRequest)
    
    expect(httpError.statusCode).toBe(400)
    expect(httpError.body.error).toEqual(new InvalidIdError(httpRequest.body.id).message)
  })

  test('should return 400 if an invalid name is provided', async () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        id: 1,
        name: 'O',
      }
    }
    const httpError: HttpErrorResponse = await sut.handle(httpRequest)
    expect(httpError.statusCode).toBe(400)
    expect(httpError.body.error).toEqual(new InvalidNameError(httpRequest.body.name).message)
  })

  test('should return 500 if create tier throws', async () => {
    const {sut, createTierStub} = makeSut()
    jest.spyOn(createTierStub, 'execute').mockImplementation(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        id: 1,
        name: 'anyName',
      }
    }

    const httpError = await sut.handle(httpRequest)
    expect(httpError.statusCode).toEqual(500)
    expect((httpError.body as ServerError).message).toEqual('Server error: internal.')
  })

})