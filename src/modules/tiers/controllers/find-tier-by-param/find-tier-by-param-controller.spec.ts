/** 
 * @jest-environment ./prisma/prisma-environment-jest 
 **/
import { TiersRepository } from '../../repositories/tiers-repository'
import { FindTierByParamController } from './find-tier-by-param-controller'
import { InMemoryTiersRepository } from '../../repositories/in-memory-tiers-repository'
import { Tier } from '../../domain/entities/tier'
import { HttpResponse } from '../../../../core/infra/http/http-response'
import { FindTierByParam } from '../../use-cases/requests/find-tier-by-param/find-tier-by-param-use-case'
import request from "supertest"

type SutType = {
  tiersRepository: TiersRepository
  findTierByParamStub: FindTierByParam
  sut: FindTierByParamController
}

const makeSut = (): SutType => {
  var tiers: Tier[] = []
  const tiersRepository: TiersRepository = new InMemoryTiersRepository(tiers);

  const findTierByParamStub = new FindTierByParam(tiersRepository)
  const sut = new FindTierByParamController(findTierByParamStub)

  return { sut, findTierByParamStub, tiersRepository }
}


describe('Get One Tier by Param', () => {

  it('should be able to get one tier by parameter', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      params: {
        idOrName: "mitico"
      }
    }

    const httpResponse: HttpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      tier: {},
    })
  })

})