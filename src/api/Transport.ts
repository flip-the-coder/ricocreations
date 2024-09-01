import axios, {
   AxiosError,
   AxiosPromise,
   AxiosRequestConfig,
   AxiosTransformer,
} from 'axios';
import HttpStatus from 'http-status-codes';
import { TokenUtils } from '../utils/TokenUtils';
import { IOmniAuthToken } from '../models/auth/IOmniAuthToken';
import { Class } from 'jsog-typescript/dist/support/Class';
import { JsogService } from 'jsog-typescript';
import { JsogObject } from 'jsog-typescript/dist/model/JsogObject';

const jsog = new JsogService();

const BASE_URL: string = '';
const fetch = axios.create({ baseURL: BASE_URL });

axios.defaults.headers.get['Pragma'] = 'no-cache';
axios.defaults.headers.get['Cache-Control'] = 'no-cache, no-store';

fetch.interceptors.response.use(
   (response) => {
      return response;
   },
   (error) => {
      const errorResponse = error.response;
      if (Transport.isTokenExpiredError(errorResponse)) {
         return Transport.resetTokenAndReattemptRequest(error);
      }
      return Promise.reject(error);
   }
);

let isAlreadyFetchingAccessToken = false;
// This is the list of waiting requests that will retry after the token refresh complete
let waitingRequests: any[] = [];
let refreshTokenCall: (
   authToken: IOmniAuthToken
) => AxiosPromise<IOmniAuthToken>;

export class Transport {
   public static get<T = any>(
      url: string,
      classObject?: Class<object>
   ): AxiosPromise<T> {
      return fetch.get<T>(url, Transport.transformResponseConfig(classObject));
   }

   public static post<T = any>(
      url: string,
      data?: any,
      classObject?: Class<object>,
      config?: AxiosRequestConfig | undefined
   ): AxiosPromise<T> {
      return fetch.post<T>(
         url,
         data,
         Transport.transformResponseConfig(classObject, config)
      );
   }

   public static postAsMultipart<T = any>(
      url: string,
      data?: any,
      classObject?: Class<object>
   ): AxiosPromise<T> {
      const config = {
         ...Transport.transformResponseConfig(classObject),
         headers: {
            'content-type': 'multipart/form-data',
         },
      };
      return fetch.post<T>(url, data, config);
   }

   public static put<T = any>(
      url: string,
      data?: any,
      classObject?: Class<object>
   ): AxiosPromise<T> {
      return fetch.put<T>(
         url,
         data,
         Transport.transformResponseConfig(classObject)
      );
   }

   public static putAsMultipart<T = any>(
      url: string,
      data?: any,
      classObject?: Class<object>
   ): AxiosPromise<T> {
      const config = {
         ...Transport.transformResponseConfig(classObject),
         headers: {
            'content-type': 'multipart/form-data',
         },
      };
      return fetch.put<T>(url, data, config);
   }

   public static patch<T = any>(
      url: string,
      data?: any,
      classObject?: Class<object>
   ): AxiosPromise<T> {
      return fetch.patch<T>(
         url,
         data,
         Transport.transformResponseConfig(classObject)
      );
   }

   public static del<T = any>(
      url: string,
      classObject?: Class<object>
   ): AxiosPromise<T> {
      return fetch.delete<T>(
         url,
         Transport.transformResponseConfig(classObject)
      );
   }

   public static setAuthToken(
      authToken: IOmniAuthToken,
      refreshTokenApi?: (
         authToken: IOmniAuthToken
      ) => AxiosPromise<IOmniAuthToken>
   ) {
      if (authToken && authToken.access_token) {
         fetch.defaults.headers.common.Authorization =
            this.createBearerAuthorization(authToken.access_token);
         TokenUtils.saveAuthToken(authToken);
      } else {
         delete fetch.defaults.headers.common.Authorization;
         // TokenUtils.removeAuthToken();
      }

      if (refreshTokenApi !== undefined) {
         refreshTokenCall = refreshTokenApi;
      }
   }

   public static setJwtToken(jwtToken: string) {
      if (jwtToken) {
         fetch.defaults.headers.common.Authorization =
            this.createBearerAuthorization(jwtToken);
         TokenUtils.saveJwtToken(jwtToken);
      } else {
         delete fetch.defaults.headers.common.Authorization;
         TokenUtils.removeJwtToken();
      }
   }

   public static async resetTokenAndReattemptRequest(error: any): Promise<any> {
      try {
         const { response: errorResponse } = error;
         const refreshToken = TokenUtils.getRefreshToken();
         if (!refreshToken) {
            return Promise.reject(error);
         }
         const retryOriginalRequest = new Promise((resolve) => {
            Transport.addSubscriber((token: string) => {
               errorResponse.config.headers.Authorization =
                  this.createBearerAuthorization(token);
               resolve(axios(errorResponse.config));
            });
         });
         const authToken = TokenUtils.getAuthToken();
         if (authToken && !isAlreadyFetchingAccessToken) {
            isAlreadyFetchingAccessToken = true;
            const response = await refreshTokenCall(authToken);
            if (!response.data) {
               isAlreadyFetchingAccessToken = false;
               return Promise.reject(error);
            }
            const newToken = response.data.access_token;
            TokenUtils.saveRefreshToken(newToken);
            isAlreadyFetchingAccessToken = false;
            Transport.onAccessTokenFetched(newToken);
         }
         return retryOriginalRequest;
      } catch (err) {
         return Promise.reject(err);
      }
   }

   public static isTokenExpiredError(errorResponse: any): boolean {
      let isExpiredError: boolean = false;
      if (errorResponse === HttpStatus.UNAUTHORIZED) {
         isExpiredError = TokenUtils.isTokenExpired();
      }
      return isExpiredError;
   }

   public static handleResponse(
      onFulfilled?: (error: any) => any,
      onRejected?: (error: any) => any
   ) {
      fetch.interceptors.response.use(onFulfilled, onRejected);
   }

   public static serialize<T>(object: T): JsogObject & T {
      return jsog.serialize(object);
   }

   public static transformData(data: any, classObject: Class<object>): object {
      const result = jsog.deserialize(data, classObject);
      if (Array.isArray(result)) {
         return result as object[];
      }
      return result as object;
   }

   public static isAxiosError(error: any): error is AxiosError {
      return (error as AxiosError).isAxiosError !== undefined;
   }

   private static onAccessTokenFetched(token: string) {
      waitingRequests.forEach((callback) => callback(token));
      waitingRequests = [];
   }

   private static addSubscriber(callback: any) {
      waitingRequests.push(callback);
   }

   private static transformResponseConfig(
      classObject?: Class<object>,
      config?: AxiosRequestConfig | undefined
   ): AxiosRequestConfig | undefined {
      let requestConfig: AxiosRequestConfig | undefined;
      let transformResponse: AxiosTransformer | AxiosTransformer[] | undefined;
      const transormer = axios.defaults.transformResponse as AxiosTransformer[];

      if (classObject !== undefined) {
         transformResponse = transormer.concat((data: any) => {
            return Transport.transformData(data, classObject);
         });
      }

      if (classObject !== undefined && config !== undefined) {
         requestConfig = {
            ...config,
            transformResponse,
         };
      } else if (classObject !== undefined) {
         requestConfig = {
            transformResponse,
         };
      } else if (config !== undefined) {
         requestConfig = config;
      }

      return requestConfig;
   }

   private static createBearerAuthorization(token: string): string {
      return `Bearer ${token}`;
   }

   public static getFile<T = any>(url: string): AxiosPromise<T> {
      return fetch.get<T>(url, {
         method: 'GET',
         responseType: 'blob',
      });
   }
}
