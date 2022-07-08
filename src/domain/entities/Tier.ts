import { Entity } from "../../core/domain/Entity";

type TierProps ={
    name: string;
    url: string;
}

export class Tier extends Entity<TierProps>{
    private constructor(props: TierProps, id?:string){
        super(props, id)
    }

    static create(props: TierProps, id?: string){
        const tier = new Tier(props, id);
        return tier
    }
}