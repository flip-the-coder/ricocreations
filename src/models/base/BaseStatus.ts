import { BaseModel } from './BaseModel';

export class BaseStatus extends BaseModel {
    code: string;
    displayName: string;
    description: string;
}
