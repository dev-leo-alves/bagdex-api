import { Name } from '../../../../../core/domain/entities/name'
import { Url } from '../../../../../core/domain/entities/url'
import { Id } from '../../../../../core/domain/entities/id'
import { Tier } from '../../../domain/entities/tier'
import { InMemoryTiersRepository } from '../../../repositories/in-memory-tiers-repository'
import { FindTierByParam } from './find-tier-by-param-use-case'

let tiersRepository: InMemoryTiersRepository
let findTierByParam: FindTierByParam;

describe('Find Tier By Name', () => {
  beforeEach(() => {
    tiersRepository = new InMemoryTiersRepository()
    findTierByParam = new FindTierByParam(tiersRepository)
  })

  it('should be able to find a tier by name', async () => {

    const tier = Tier.create({
      id: Id.create(1).value as Id,
      name: Name.create('exact_name').value as Name,
      url: Url.create("https://www.validurl.com/1").value as Url
    }).value as Tier

    tiersRepository.create(tier)

    const response = await findTierByParam.execute("exact_name")

    expect(response.name.value).toEqual('exact_name')
  })
})