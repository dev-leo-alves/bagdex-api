import { Controller } from '../../../core/infra/controller'
import { PrismaTiersRepository } from '../repositories/prisma-tiers-repository'
import { FindAllTiers } from '../use-cases/find-all-tiers/find-all-tiers-use-case'
import { FindAllTiersController } from '../controllers/find-all-tiers/find-all-tiers-controller'

export function makeFindAllTiersController(): Controller {
  const prismaTiersRepository = new PrismaTiersRepository()
  const findAllTiers = new FindAllTiers(prismaTiersRepository)
  const findAllTiersController = new FindAllTiersController(findAllTiers)

  return findAllTiersController
}