import {User, UserFormValues} from "../models/User";
import {makeAutoObservable, runInAction} from "mobx";
import Agent from "../api/agent";
import {store} from "./store";
import { history } from "../..";

export default class UserStore{
    user: User | null = null;
    token: string | null = null;
    appLoaded: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn(){
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try {
            const user =  await Agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push('/activities');
        }catch (e) {
            console.log(e);
            throw e;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        history.push('/');
        store.modalStore.closeModal();
    }

    getUser = async () => {
        try {
            const user = await Agent.Account.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error);
        }
    }

    register = async (creds: UserFormValues) => {
        try {
            const user = await Agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push('/activities');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }
}