export interface IOmniAuthToken {
    '.expires': string;
    '.issued': string;
    access_token: string;
    refresh_token: string;
    token_type: string;
    userName: string;
}
