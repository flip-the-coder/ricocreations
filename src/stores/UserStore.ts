import { action, observable, makeAutoObservable } from 'mobx';
import userApi from '../api/userApi';

export class UserStore {
   users = observable.map(new Map<string, string>());
   @observable isLoading: boolean = false;

   constructor() {
      makeAutoObservable(this);
   }

   @action fetchUsersById = async (userIds: string[]) => {
      try {
         this.setIsLoading(true);
         // const results = await Promise.all(
         //     userIds.map(async (id) => {
         //         try {
         //             const r = await userApi.username.fetchUsername(id);
         //             return [id, r.data];
         //         } catch (error) {
         //             console.error(error);
         //             return [id, ''];
         //         }
         //     })
         // );
         // // @ts-ignore
         // this.users.merge(results);
      } catch (error) {
         console.error(error);
      } finally {
         this.setIsLoading(false);
      }
   };

   @action setIsLoading(value: boolean) {
      this.isLoading = value;
   }

   @action addUser(userId: string, username: string) {
      this.users.set(userId, username);
   }
}
