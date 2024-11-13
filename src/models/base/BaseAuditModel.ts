import { BaseModel } from './BaseModel';

export class BaseAuditModel extends BaseModel {
    createdDate: Date;
    modifiedDate: Date;
    deletedDate: Date;
    createdBy: string;
}
