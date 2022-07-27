import { Controller } from '../../../../core/infra/controller'
import { HttpResponse } from '../../../../core/infra/http/http-response'
import { serverError, ok } from '../../../../core/infra/http/http-helper'
import { FindTierByParam } from '../../use-cases/find-tier-by-param/find-tier-by-param-use-case'
import { HttpRequest } from '../../../../core/infra/http/http-request'

export class FindTierByParamController implements Controller {
  constructor(private findTierByParam: FindTierByParam) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const result = await this.findTierByParam.execute(httpRequest.params.idOrName)

      const tier = {
        id: result.props.id.value,
        name: result.name.value,
        url: result.url.value
      }

      return ok({ tier: tier })
    } catch (error) {
        return serverError('internal')
    }
  }
}