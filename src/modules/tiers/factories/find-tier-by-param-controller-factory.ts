import { Controller } from '../../../core/infra/controller'
import { PrismaTiersRepository } from '../repositories/prisma-tiers-repository'
import { FindTierByParamController } from '../controllers/find-tier-by-param/find-tier-by-param-controller'
import { FindTierByParam } from '../use-cases/requests/find-tier-by-param/find-tier-by-param-use-case'

export function makeFindTierByParamController(): Controller {
  const prismaTiersRepository = new PrismaTiersRepository()
  const findTierByParam = new FindTierByParam(prismaTiersRepository)
  const findTierByParamController = new FindTierByParamController(findTierByParam)

  return findTierByParamController
}