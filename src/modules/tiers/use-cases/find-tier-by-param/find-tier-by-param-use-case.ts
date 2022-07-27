import {TiersRepository} from "../../repositories/tiers-repository"
import { Tier } from "../../domain/entities/tier"

type FindTierByParamResponse = Tier

export class FindTierByParam{
    constructor(private tiersRepository: TiersRepository){}

    async execute(param: string): Promise<FindTierByParamResponse> {
        const tier = await this.tiersRepository.findByName(param)
        return tier
    }
}