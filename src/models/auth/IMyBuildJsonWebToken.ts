import { IOmniAuthToken } from './IOmniAuthToken';

export interface IMyBuildJSONWebToken {
    authToken: IOmniAuthToken;
    exp: number;
    iat: number;
    id: string;
    role: string;
    sub: string;
}
