import { Controller } from '../../../core/infra/controller'
import { PrismaTiersRepository } from '../repositories/prisma-tiers-repository'
import { UpdateTier } from '../use-cases/requests/update-tier/update-tier-use-case'
import { UpdateTierController } from '../controllers/update-tier/update-tier-controller'

export function makeUpdateTierController(): Controller {
  const prismaTiersRepository = new PrismaTiersRepository()
  const updateTier = new UpdateTier(prismaTiersRepository)
  const updateTierController = new UpdateTierController(updateTier)

  return updateTierController
}