import { Controller } from '../../../../core/infra/controller'
import { HttpResponse } from '../../../../core/infra/http/http-response'
import { HttpRequest } from '../../../../core/infra/http/http-request';
import { CreateTierResponseDTO } from '../../dtos/create-tier-response-dto';
import { CreateTier } from '../../use-cases/create-tier/create-tier-use-case';
import { badRequest, serverError, ok } from '../../../../core/infra/http/http-helper';
import { MissingParamError } from '../../../../core/infra/errors/missing-param-error';

export class CreateTierController implements Controller {
    constructor(
      private createTier: CreateTier
    ) {}
  
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      try{
       
          if (!httpRequest.body.name || !httpRequest.body.id) {
              const field = !httpRequest.body.name ? 'name' : 'id'
              return badRequest(new MissingParamError(field))
          }
           
          const tier = {id: httpRequest.body.id, name: httpRequest.body.name }
          const createTierResponse: CreateTierResponseDTO = await this.createTier.execute(tier)
          if (createTierResponse.isLeft()) {
            return badRequest(createTierResponse.value)
          }
          const tierProps =  createTierResponse.value.props

          const tierHttpResponse = {
            id: tierProps.id.value,
            name: tierProps.name.value,
            url: tierProps.url.value
          }

          return ok(tierHttpResponse)

      }catch(error){ 
        return serverError('internal')
      }
        
    }
  }