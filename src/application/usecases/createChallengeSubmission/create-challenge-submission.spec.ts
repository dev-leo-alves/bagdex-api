import { Student } from "../../../domain/entities/student";
import { Challenge } from "../../../domain/entities/challenge";

import { InMemoryChallengesRepository } from "../../../tests/in-memory-challenges-repository";
import { InMemoryStudentsRepository } from "../../../tests/in-memory-students-repository";
import { CreateChallengeSubmission } from "./create-challenge-submission"

describe("Create challenge submission use case", ()=>{
    it("should be able to create a new challenge submission", async ()=>{
        const studentsRepository = new InMemoryStudentsRepository();
        const challengesRepository = new InMemoryChallengesRepository();

        const student = Student.create({
            name: "Leonardo Alves de Oliveira",
            email: "leonardo.alves@ativo.com"
        })

        const challenge = Challenge.create({
            title: "Challenge 01",
            instructionUrl: "http://example.com"
        })

        studentsRepository.items.push(student)
        challengesRepository.items.push(challenge)


        const sut = new CreateChallengeSubmission(
            studentsRepository,
            challengesRepository
        );

        const response = await sut.execute({
            studentId: student.id,
            challengeId: challenge.id,
        })

        expect(response).toBeTruthy()
    })
})