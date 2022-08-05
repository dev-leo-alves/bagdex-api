import {TiersRepository} from "../../../repositories/tiers-repository"
import { FindAllTiersDTO } from "../../../dtos/find-all-tiers/find-all-tiers-dto"

type FindAllTiersResponse = FindAllTiersDTO;

export class FindAllTiers{
    constructor(private tiersRepository: TiersRepository){}

    async execute(): Promise<FindAllTiersResponse> {
      
        const findAll = await this.tiersRepository.findAll()
        const result = {
            count: findAll.count, 
            tiers: findAll.tiers
        }

        return result
    }
}