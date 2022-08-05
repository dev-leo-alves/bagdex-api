import { Controller } from '../../../../core/infra/controller'
import { HttpResponse } from '../../../../core/infra/http/http-response'
import { serverError, ok } from '../../../../core/infra/http/http-helper'
import { FindAllTiers } from '../../use-cases/requests/find-all-tiers/find-all-tiers-use-case'

export class FindAllTiersController implements Controller {
  constructor(
    private findAllTiers: FindAllTiers) {}

  async handle(): Promise<HttpResponse> {
    try {
      
      const result = await this.findAllTiers.execute()
      
      const tiers = result.tiers.map(tier => {
        return {
          id: tier.props.id.value,
          name: tier.name.value,
          url: tier.url.value
        }
      })

      const response = {
        count: result.count,
        results: tiers
      }

      return ok(response)
    } catch (error) {
        return serverError('internal')
    }
  }
}