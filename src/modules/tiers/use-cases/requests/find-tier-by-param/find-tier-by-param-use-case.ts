import {TiersRepository} from "../../../repositories/tiers-repository"
import { Tier } from "../../../domain/entities/tier"
import { isNumeric } from "../../../../../utils/is-numeric"

type FindTierByParamResponse = Tier

export class FindTierByParam{
    constructor(private tiersRepository: TiersRepository){}

    async execute(param: string): Promise<FindTierByParamResponse> {

        const isId = isNumeric(param)

        if(isId){
            const idParam = parseInt(param)
            const tier = await this.tiersRepository.findById(idParam)
            return tier
           
        }

        const tier = await this.tiersRepository.findByName(param)
        return tier
        
    }
}