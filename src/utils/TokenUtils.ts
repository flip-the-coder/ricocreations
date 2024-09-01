import jwt from 'jsonwebtoken';

import { IOmniAuthToken } from '../models/auth/IOmniAuthToken';
import { IMyBuildJSONWebToken } from '../models/auth/IMyBuildJsonWebToken';

export class TokenUtils {
   public static getRefreshToken(): string | null {
      let refreshToken: string | null = null;
      const authToken: IOmniAuthToken | null = TokenUtils.getAuthToken();
      if (authToken !== null) {
         refreshToken = authToken.refresh_token;
      }
      return refreshToken;
   }

   public static saveRefreshToken(refreshToken: string) {
      const authToken: IOmniAuthToken | null = TokenUtils.getAuthToken();
      if (authToken !== null) {
         authToken.refresh_token = refreshToken;
      }
   }

   public static isTokenExpired(): boolean {
      let isExpired: boolean = true;

      const authToken: IOmniAuthToken | null = TokenUtils.getAuthToken();
      if (authToken !== null) {
         const now = new Date();
         const expires = new Date(authToken['.expires']);
         isExpired = expires <= now;
      }

      return isExpired;
   }

   public static isJwtTokenExpired(): boolean {
      const jwtToken: IMyBuildJSONWebToken | null = TokenUtils.getJwtToken();

      if (!jwtToken) return true;

      return (
         jwtToken !== null &&
         !(jwtToken.exp && jwtToken.exp > Date.now() / 1000)
      );
   }

   public static saveAuthToken(authToken: IOmniAuthToken) {
      window.localStorage.setItem(
         TokenUtils.AUTH_TOKEN_KEY,
         JSON.stringify({ authToken })
      );
   }

   public static removeAuthToken() {
      window.localStorage.removeItem(TokenUtils.AUTH_TOKEN_KEY);
   }

   public static saveJwtToken(jwtToken: string) {
      window.localStorage.setItem(TokenUtils.JWT_TOKEN_KEY, jwtToken);
   }

   public static removeJwtToken() {
      window.localStorage.removeItem(TokenUtils.JWT_TOKEN_KEY);
   }

   public static getAuthToken(): IOmniAuthToken | null {
      let authToken: IOmniAuthToken | null = null;
      const storedAuthToken: string | null = window.localStorage.getItem(
         TokenUtils.AUTH_TOKEN_KEY
      );
      if (storedAuthToken !== null) {
         try {
            const parsedAuthToken: IOmniAuthToken =
               JSON.parse(storedAuthToken).authToken;
            if (parsedAuthToken) {
               authToken = parsedAuthToken;
            }
         } catch (error) {
            console.error('Could not parse token!');
         }
      }
      return authToken;
   }

   public static getJwtTokenString(): string | null {
      return window.localStorage.getItem(TokenUtils.JWT_TOKEN_KEY);
   }

   public static getJwtToken(): IMyBuildJSONWebToken | null {
      let tokenContent: IMyBuildJSONWebToken | null = null;
      const storedJwtToken: string | null = window.localStorage.getItem(
         TokenUtils.JWT_TOKEN_KEY
      );
      if (storedJwtToken !== null) {
         tokenContent = jwt.decode(storedJwtToken) as IMyBuildJSONWebToken;
      }

      return tokenContent;
   }

   private static readonly AUTH_TOKEN_KEY: string = 'authToken';
   private static readonly JWT_TOKEN_KEY: string = 'jwt';
}
