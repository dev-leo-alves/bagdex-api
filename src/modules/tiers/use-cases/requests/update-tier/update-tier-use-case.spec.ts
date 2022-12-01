/** 
 * @jest-environment ./prisma/prisma-environment-jest 
 **/
import { Tier } from "../../../domain/entities/tier";
import { InMemoryTiersRepository } from "../../../repositories/in-memory-tiers-repository";
import { UpdateTier } from "./update-tier-use-case"
import { TiersRepository } from "../../../repositories/tiers-repository";
import { TierAlreadyExistsError } from "../../errors/tier-already-exists-error";
import { InvalidIdError } from "../../../../../core/domain/entities/errors/invalid-id";
import { InvalidNameError } from "../../../../../core/domain/entities/errors/invalid-name";
import { RawTierDTO } from "../../../dtos/raw-tier-dto";
import request from "supertest";
import { app } from "../../../../../app"

type SutType = {
    sut: UpdateTier,
    tiersRepository: TiersRepository
}



const makeSut = async (): Promise<SutType> => {

    const data: RawTierDTO = {
        id: 1,
        name: 'any_name',
        url: 'https://www.validurl.com/1'
    }

    const tierId = data.id.toString()


    const tierRequest = await request(app).get("/tiers")
    console.log(tierRequest.body)
    var tiers: Tier[] = tierRequest.body.results

    const tiersRepository: TiersRepository = new InMemoryTiersRepository(tiers);

    const sut = new UpdateTier(tiersRepository)
    await sut.execute({ tierId, data })

    return { sut, tiersRepository }
}

describe("Create tier use case", () => {
    test("should not create if name already exists", async () => {
        const { sut } = await makeSut()

        const data: RawTierDTO = {
            id: 2,
            name: 'any_name',
            url: 'https://www.validurl.com/1',
        }

        const tierId = data.id.toString()

        const error = await sut.execute({ tierId, data })

        expect(error.value).toEqual(new TierAlreadyExistsError(data.name))
    })

    test("should not create if name is invalid", async () => {
        const { sut } = await makeSut()

        const data: RawTierDTO = {
            id: 3,
            name: 'O',
            url: 'https://www.validurl.com/1',
        }
        const tierId = data.id.toString()

        const error = await sut.execute({ tierId, data })

        expect(error.value).toEqual(new InvalidNameError(data.name))
    })


    test('should not create tier with invalid id', async () => {
        const { sut } = await makeSut()

        const data: RawTierDTO = {
            id: 0,
            name: 'any_name 5',
            url: 'https://www.validurl.com/1',
        }

        const tierId = data.id.toString()

        const error = await sut.execute({ tierId, data })

        expect(error.value).toEqual(new InvalidIdError(data.id))
    })


})