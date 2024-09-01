import { StatusCodes } from 'http-status-codes';
import { observable, runInAction, action, makeAutoObservable } from 'mobx';
import jwt from 'jsonwebtoken';
import { TokenUtils } from '../utils/TokenUtils';
import { Transport } from '../api/Transport';
import userApi from '../api/userApi';
import { DecodedToken, User } from '../models/User';
import { Error } from '../models/Error';

export class AuthStore {
   @observable public error: string = '';
   @observable public isLoggedIn: boolean = false;
   @observable public loggedInUser: User;
   @observable requireAuthorization: boolean = false;

   constructor() {
      makeAutoObservable(this);

      this.isLoggedIn = !TokenUtils.isJwtTokenExpired();
      this.isLoggedIn && this.setLoggedInUser();

      Transport.handleResponse(
         (response: any) => response,
         (error: any) => {
            const errors = error as Error;
            if (errors.response) {
               switch (errors.response.status) {
                  case StatusCodes.UNAUTHORIZED:
                     this.logout();
                     break;

                  default:
                     break;
               }
            }
            return Promise.reject(errors);
         }
      );
      window.addEventListener('storage', () => {
         if (TokenUtils.isJwtTokenExpired()) {
            this.logout();
         }
      });
   }

   public async login(email: string, password: string): Promise<boolean> {
      try {
         const response = await userApi.auth.login(email, password);
         const authorizationHeader = response.headers.authorization;
         const token = authorizationHeader.substring(
            'Bearer '.length,
            authorizationHeader.length
         );
         Transport.setJwtToken(token);
         const decodedToken = jwt.decode(token) as User;
         if (decodedToken !== null) {
            runInAction(() => {
               this.loggedInUser = new User(decodedToken);
               this.isLoggedIn = true;
               this.error = '';
               this.setRequireAuthorization(true);
            });
         }
      } catch (error) {
         const errors = error as Error;
         runInAction(() => (this.isLoggedIn = false));
         if (
            errors.response &&
            errors.response.status === StatusCodes.UNAUTHORIZED
         ) {
            runInAction(() => {
               this.error = errors.response.data.error;
            });
         } else {
            console.error(error);
         }
      }
      return this.isLoggedIn;
   }

   @action public logout = () => {
      TokenUtils.removeJwtToken();
      this.isLoggedIn = false;
      this.setRequireAuthorization(false);
   };

   @action public setRequireAuthorization(requireAuthorization: boolean) {
      this.requireAuthorization = requireAuthorization;
   }

   @action public setLoggedInUser = () => {
      Transport.setJwtToken(TokenUtils.getJwtTokenString()!);
      const decodedToken = jwt.decode(
         TokenUtils.getJwtTokenString()!
      ) as DecodedToken;
      if (decodedToken !== null) {
         this.loggedInUser = new User(decodedToken);
         this.isLoggedIn = true;
         this.error = '';
         this.setRequireAuthorization(true);
      }
   };
}
