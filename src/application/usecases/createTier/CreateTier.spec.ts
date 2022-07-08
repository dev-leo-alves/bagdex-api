import { Tier } from "../../../domain/entities/Tier";

import { InMemoryTiersRepository } from "../../repositories/tests/InMemoryTiersRepository";
import { CreateTier } from "./CreateTier"

describe("Create tier use case", ()=>{
    it("should be able to create a new tier if does not exists", async ()=>{
        const tiersRepository = new InMemoryTiersRepository();

        const tier = Tier.create({
            name: "inicial",
            url: "http://example.com"
        })

        tiersRepository.items.push(tier)

        const sut = new CreateTier(
            tiersRepository,
        );

        const response = await sut.execute({
            name: "mitico",
            url: "http://example.com"
        })

        expect(response).toBeTruthy();
    })
})