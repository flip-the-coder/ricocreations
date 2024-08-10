import { BaseModel } from './BaseModel';

export class BaseProperty extends BaseModel {
    key: string;
    value: string;
    overriddenValue: string;
}
