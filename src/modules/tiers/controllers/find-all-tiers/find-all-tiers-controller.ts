import { Controller } from '../../../../core/infra/controller'
import { HttpResponse } from '../../../../core/infra/http/http-response'
import { serverError, ok } from '../../../../core/infra/http/http-helper'
import { FindAllTiers } from '../../use-cases/find-all-tiers/find-all-tiers-use-case'

export class FindAllTiersController implements Controller {
  constructor(private findAllTiers: FindAllTiers) {}

  async handle(): Promise<HttpResponse> {
    try {
      const result = await this.findAllTiers.execute()

      const tiers = result.map(tier => {
        return {
          id: tier.id,
          name: tier.name.value,
          url: tier.url.value
        }
      })

      return ok({ tiers: tiers })
    } catch (error) {
        return serverError('internal')
    }
  }
}