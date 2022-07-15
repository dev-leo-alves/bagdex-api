import { Entity } from "../../../../core/domain/entity";
import { right } from "../../../../core/shared/either";
import { TierDTO } from "../../dtos/tier-dto";
import { CreateDTO } from "../../dtos/create-dto";

export class Tier extends Entity<TierDTO>{

    get name() {
        return this.props.name
    }
    
    get url() {
        return this.props.url
    }

    private constructor(props: TierDTO, id?: number){
        super(props, id)
        Object.freeze(this)
    }

    static create(props: TierDTO, id?: number): CreateDTO {
        const tier = new Tier(props, id)
        return right(tier)
    }
}