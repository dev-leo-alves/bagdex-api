import { Name } from '../../../../../core/domain/entities/name'
import { Url } from '../../../../../core/domain/entities/url'
import { Id } from '../../../../../core/domain/entities/id'
import { Tier } from '../../../domain/entities/tier'
import { InMemoryTiersRepository } from '../../../repositories/in-memory-tiers-repository'
import { FindAllTiers } from './find-all-tiers-use-case'

let tiersRepository: InMemoryTiersRepository
let findAllTiers: FindAllTiers;

describe('Get All Tags', () => {
  beforeEach(() => {
    tiersRepository = new InMemoryTiersRepository()
    findAllTiers = new FindAllTiers(tiersRepository)
  })

  it('should be able to get all tags', async () => {
    const tag1 = Tier.create({
      id: Id.create(1).value as Id,
      name: Name.create('Name 01').value as Name,
      url: Url.create("https://www.validurl.com/1").value as Url
    }).value as Tier

    const tag2 = Tier.create({
        id: Id.create(2).value as Id,
        name: Name.create('Name 02').value as Name,
        url: Url.create("https://www.validurl.com/2").value as Url
      }).value as Tier

    tiersRepository.create(tag1)
    tiersRepository.create(tag2)

    const response = await findAllTiers.execute()

    expect(response.length).toBe(2)
    expect(response[0].name.value).toEqual('Name 01')
    expect(response[1].name.value).toEqual('Name 02')
  })
})