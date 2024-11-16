import config from "../conf/config";
import { Client, Account, ID } from 'appwrite';

export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
        .setEndpoint(config.appwirteUrl)
        .setProject(config.appwirteProjctId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try{
            const userAccount =  await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                // call another method
                return this.login({email, password});
            }else{
                return userAccount;
            }
        }catch(error){
            console.error(error);
            throw error;
        }
    }


    // async register(email, password) {
    //     return await this.client.account.create(email, password);
    // }

    async login({email, password}) {
        try{
             await this.account.createEmailPasswordSession(email, password);
        }catch(error){
            console.error(error);
            throw error;
        }
    }

    async logout() {
        try{
            await this.account.deleteSessions();
        }catch(error){
            console.error("Appwrite logout error", error);
            throw error;
        }
      };

    async getUser() {
        try{
            const user = await this.account.get();
            // console.log(user);
            return user;
        }catch(error){
            console.error("Appwrite getuser error", error);
            // throw error;
        }
        return null;
    }
      
}

const authService = new AuthService();

export default authService;
