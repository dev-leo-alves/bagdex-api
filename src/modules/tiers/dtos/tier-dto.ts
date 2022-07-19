import { Id } from "../../../core/domain/entities/id";
import { Name } from "../../../core/domain/entities/name";
import { Url } from "../../../core/domain/entities/url";

export interface TierDTO{
    id: Id;
    name: Name;
    url: Url;
}