import { Tier } from "../../domain/entities/tier";
import { Either, left, right } from "../../../../core/shared/either";
import { InvalidUrlError } from "../../../../core/domain/entities/errors/invalid-url";
import { InMemoryTiersRepository } from "../../repositories/in-memory-tiers-repository";
import { CreateTier } from "./create-tier-use-case"
import { TiersRepository } from "../../repositories/tiers-repository";
import { TierAlreadyExistsError } from "./errors/tier-already-exists-erros";

type SutType = {
    sut: CreateTier,
    tiersRepository: TiersRepository
}

const makeSut = async (): Promise<SutType> => {
    const name = 'any_name'
    const url = 'https://www.validurl.com'
    var tiers: Tier[] = []
    const tiersRepository: TiersRepository = new InMemoryTiersRepository(tiers);
    const sut = new CreateTier(tiersRepository)
    await sut.execute({ name, url })

    return {sut, tiersRepository}
}


describe("Create tier use case", ()=>{
    test("should not create if name already exists", async ()=>{
        const {sut} = await makeSut()
        const name = 'any_name'
        const url = 'https://www.validurl.com'

        const error = await sut.execute({ name, url })

        expect(error.value).toEqual(new TierAlreadyExistsError(name))
    })

    test('should not create tier with invalid url', async () => {
        const name = 'any_name'
        const url = 'invalid_url'
        
        var tiers: Tier[] = []
        const tiersRepository: TiersRepository = new InMemoryTiersRepository(tiers);

        const sut = new CreateTier(tiersRepository)

        const error = await sut.execute({ name, url })

        expect(error.value).toEqual(new InvalidUrlError(url))
    })


})