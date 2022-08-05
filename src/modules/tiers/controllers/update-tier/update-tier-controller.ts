import { Controller } from '../../../../core/infra/controller'
import { HttpResponse } from '../../../../core/infra/http/http-response'
import { HttpRequest } from '../../../../core/infra/http/http-request';
import { UpdateTierResponseDTO } from '../../dtos/update-tier/update-tier-response-dto';
import { UpdateTier } from '../../use-cases/requests/update-tier/update-tier-use-case';
import { badRequest, serverError, ok } from '../../../../core/infra/http/http-helper';
import { UpdateTierRequestDTO } from '../../dtos/update-tier/update-tier-request-dto';
import { tierHttpResponseDTO } from '../../dtos/http-tier/http-tier-response-dto';

export class UpdateTierController implements Controller {
    constructor(
      private updateTier: UpdateTier
    ) {}
  
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      try{
         
          const updateTierRequest: UpdateTierRequestDTO = {
            tierId: httpRequest.params.id,
            data: httpRequest.body
          }

          const updateTierResponse: UpdateTierResponseDTO = await this.updateTier.execute(updateTierRequest)
          
          if (updateTierResponse.isLeft()) {
            return badRequest(updateTierResponse.value)
          }

          const tierProps = updateTierResponse.value.props

          const tierHttpResponse: tierHttpResponseDTO = {
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