import {TiersRepository} from "../../repositories/tiers-repository"
import { Tier } from "../../domain/entities/tier"

type FindAllTiersResponse = Tier[]

export class FindAllTiers{
    constructor(private tiersRepository: TiersRepository){}

    async execute(): Promise<FindAllTiersResponse> {
      
        const tiers = await this.tiersRepository.findAll()
        return tiers
    }
}