/** 
 * @jest-environment ./prisma/prisma-environment-jest 
 **/
import { TiersRepository } from '../../repositories/tiers-repository'
import { FindAllTiers } from '../../use-cases/requests/find-all-tiers/find-all-tiers-use-case'
import { FindAllTiersController } from './find-all-tiers-controller'
import { InMemoryTiersRepository } from '../../repositories/in-memory-tiers-repository'
import { Tier } from '../../domain/entities/tier'
import { HttpResponse } from '../../../../core/infra/http/http-response'


type SutType = {
  tiersRepository: TiersRepository
  findAllTiersStub: FindAllTiers
  sut: FindAllTiersController
}

const makeSut = (): SutType => {
  var tiers: Tier[] = []
  const tiersRepository: TiersRepository = new InMemoryTiersRepository(tiers);

  const findAllTiersStub = new FindAllTiers(tiersRepository)
  const sut = new FindAllTiersController(findAllTiersStub)

  return { sut, findAllTiersStub, tiersRepository }
}


describe('Get All Tiers', () => {

  it('should be able to get all tags', async () => {
    const { sut } = makeSut()

    const httpResponse: HttpResponse = await sut.handle()
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      count: 0,
      results: []
    })
  })

})