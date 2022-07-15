// import { Name } from '../../../../core/domain/entities/name'
// import { Tier } from '../../domain/entities/tier'
// import { InMemoryTiersRepository } from '../../repositories/in-memory-tiers-repository'
// import { FindAllTiers } from './find-all-tiers-use-case'

// let tiersRepository: InMemoryTiersRepository
// let findAllTiers: FindAllTiers

// describe('Get All Tags', () => {
//   beforeEach(() => {
//     tiersRepository = new InMemoryTiersRepository()
//     findAllTiers = new findAllTiers(tiersRepository)
//   })

//   it('should be able to get all tags', async () => {
//     const tag1 = Tier.create({
//       name: Name.create('inicial').value as Name,
//     }).value as Tier

//     const tag2 = Tier.create({
//       name: Name.create('mitico').value as Name,
//     }).value as Tier

//     tiersRepository.create(tag1)
//     tiersRepository.create(tag2)

//     const response = await findAllTiers.execute()

//     expect(response.length).toBe(2)
//     expect(response[0].name.value).toEqual('inicial')
//     expect(response[1].name.value).toEqual('mitico')
//   })
// })