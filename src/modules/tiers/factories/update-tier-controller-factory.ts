import { Controller } from '../../../core/infra/controller'
import { PrismaTiersRepository } from '../repositories/prisma-tiers-repository'
import { CreateTier } from '../use-cases/create-tier/create-tier-use-case'
import { CreateTierController } from '../controllers/create-tier/create-tier-controller'

export function makeCreateTierController(): Controller {
  const prismaTiersRepository = new PrismaTiersRepository()
  const createTier = new CreateTier(prismaTiersRepository)
  const createTierController = new CreateTierController(createTier)

  return createTierController
}