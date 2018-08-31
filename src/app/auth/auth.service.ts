import { IAuthCredentials, IAuthToken } from './auth.interfaces';
import { IHttpResponse } from 'angular';
export class AuthService {
   static $inject = ["$http", "API_ENDPOINT"];

   constructor(public $http: ng.IHttpService, private API_ENDPOINT: string) {
      this.$http = $http;
      this.API_ENDPOINT = API_ENDPOINT;
   }
   token: string = ''

   public saveToken(token: string) {
     localStorage.setItem('mtoken', token);
     token = token;
   }

   public login (credentials: IAuthCredentials) {
      return this.$http.post(
         this.API_ENDPOINT + "/auth",
         credentials
       );
   }
   public async request(credentials: IAuthCredentials) {
      try {
         const authAnswer: IHttpResponse<any> = await this.login(credentials);

         let success: boolean = authAnswer.data.success
         if(authAnswer.data.success === true){
           this.saveToken(authAnswer.data.token);
         } else {
           console.log("Njt")
         }
         
       } catch (err) {
         console.log(err);
       };
   } 
}