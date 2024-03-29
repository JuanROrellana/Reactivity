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

    login = async (credentials: UserFormValues) => {
        try {
            const user =  await Agent.Account.login(credentials);
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

    register = async (credentials: UserFormValues) => {
        try {
            const user = await Agent.Account.register(credentials);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push('/activities');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    setImage = (image: string) => {
        if (this.user) this.user.image = image;
    }

    setDisplayName = (name: string) => {
        if (this.user) this.user.displayName = name;
    }
}