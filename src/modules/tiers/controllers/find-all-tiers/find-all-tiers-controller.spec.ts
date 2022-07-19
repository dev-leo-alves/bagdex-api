 import { app } from '../../../../app'
 import { prisma } from '../../../../prisma'
 import { CreateTierController } from '../create-tier/create-tier-controller'
 import { CreateTier } from '../../use-cases/create-tier/create-tier-use-case'
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
 
 describe('Get All Tiers (e2e)', () => {
 
   it('should be able to get all tags', async () => {
    const {sut, tiersRepository} = makeSut()
 
    
    await sut.handle( {
        body: {
          id: 1,
          name: 'Tier 01',
          url: 'https://www.validurl/1'
        }
      }
    )

    await sut.handle({
        body: {
          id: 2,
          name: 'Tier 02',
          url: 'https://www.validurl/2'
        }
      }
    )

    await sut.handle( {
        body: {
          id: 3,
          name: 'Tier 03',
          url: 'https://www.validurl/3'
        }
      }
    )
    const response = await tiersRepository.findAll()

     expect(response).toEqual({
       body: [
         expect.objectContaining({
           id: 1,
           name: 'Tier 01',
           url: 'https://www.validurl/1'
         }),
         expect.objectContaining({
           id: 2,
           name: 'Tier 02',
           url: 'https://www.validurl/2'
         }),
         expect.objectContaining({
           id: 3,
           name: 'Tier 03',
           url: 'https://www.validurl/3'
         }),
       ],
     })
   })
 })