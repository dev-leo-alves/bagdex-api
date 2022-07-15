import { v4 as uuid } from 'uuid'

export abstract class Entity<T> {
    protected _id: number | string;
    public props: T;

    
    get id()  {
        return  this._id;
    }
    

    constructor(props: T, id?:number | string){
        this.props = props;
        this._id = id || uuid();
    }

    public equals(object?: Entity<T>): boolean{
        if(object === null || object === undefined){
            return false
        }

        if(this === object){
            return false
        }

        return this._id === object._id;
    }
}