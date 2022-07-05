import { Entity } from "../../core/domain/Entity";

type CorrectionProps ={
    grade: number;
    submissionId: string;
    createdAt: Date;
}

export class Correction extends Entity<CorrectionProps>{

    private constructor(props: CorrectionProps, id?:string){
        super(props, id)
    }

    static create(props: CorrectionProps, id?: string){
        const corretion = new Correction(props, id);
        return corretion
    }
}