import { Tier } from "../../domain/entities/tier";
import { Either, left, right } from "../../../../core/shared/either";
import { InvalidUrlError } from "../../../../core/domain/entities/errors/invalid-url";
import { InMemoryTiersRepository } from "../../repositories/in-memory-tiers-repository";
import { CreateTier } from "./update-tier-use-case"
import { TiersRepository } from "../../repositories/tiers-repository";
import { TierAlreadyExistsError } from "./errors/tier-already-exists-erros";
import { InvalidIdError } from "../../../../core/domain/entities/errors/invalid-id";
import { InvalidNameError } from "../../../../core/domain/entities/errors/invalid-name";

type SutType = {
    sut: CreateTier,
    tiersRepository: TiersRepository
}

const makeSut = async (): Promise<SutType> => {
    const id = 1
    const name = 'any_name'
    const url = 'https://www.validurl.com/1'
    var tiers: Tier[] = []
    const tiersRepository: TiersRepository = new InMemoryTiersRepository(tiers);
    const sut = new CreateTier(tiersRepository)
    await sut.execute({ id, name, url })

    return {sut, tiersRepository}
}


describe("Create tier use case", ()=>{
    test("should not create if name already exists", async ()=>{
        const {sut} = await makeSut()
        const id = 2
        const name = 'any_name'

        const error = await sut.execute({ id, name })

        expect(error.value).toEqual(new TierAlreadyExistsError(name))
    })

    test("should not create if name is invalid", async ()=>{
        const {sut} = await makeSut()
        const id = 3
        const name = 'O'


        const error = await sut.execute({ id, name })

        expect(error.value).toEqual(new InvalidNameError(name))
    })


    test('should not create tier with invalid id', async () => {
        const {sut} = await makeSut()
        const id = 0
        const name = 'any_name 5'

        const error = await sut.execute({ id, name })

        expect(error.value).toEqual(new InvalidIdError(id))
    })


})