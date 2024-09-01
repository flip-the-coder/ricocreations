export interface DecodedToken {
   id: string;
   userName: string;
   role: string;
   company_id: string;
   firstName: string;
   lastName: string;
}

export class User {
   id: string;
   userName: string;
   role: string;
   company_id: string;

   constructor(decodedToken: {
      id: string;
      userName: string;
      role: string;
      company_id: string;
   }) {
      this.id = decodedToken.id;
      this.userName = decodedToken.userName;
      this.role = decodedToken.role;
      this.company_id = decodedToken.company_id;
   }
}
