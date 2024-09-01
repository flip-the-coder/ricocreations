import { StatusCodes } from 'http-status-codes';

export interface Data {
   ModelState: [];
   Message: string;
   error: string;
}

export interface Response {
   data: Data;
   status?: StatusCodes;
}

export interface Error {
   response: Response;
}
