import { ChallengesRepository } from "../application/usecases/repositories/ChallengesRepository";
import { Challenge } from "../domain/entities/Challenge";

export class InMemoryChallengesRepository implements ChallengesRepository{
    public items: Challenge[] = [];
   
    async findById(id: string): Promise<Challenge | null> {
       const challenge = this.items.find(challenge=>challenge.id===id);

       if(!challenge){
         return null;
       }

       return challenge;
    }
}