import crypto from 'crypto';

export abstract class Entity<T> {
    protected _id: number;
    public props: T;

    
    get id()  {
        return  this._id;
    }
    

    constructor(props: T, id?:number){
        this.props = props;
        this._id = id || crypto.randomInt(248);
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