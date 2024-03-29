import axios, {AxiosError, AxiosResponse} from 'axios'
import { Activity, ActivityFormValues } from '../models/activity';
import {toast} from "react-toastify";
import { history } from '../..';
import { store } from '../stores/store';
import {User, UserFormValues} from "../models/User";
import {Photo, Profile} from "../models/Profile";
import {PaginatedResult} from "../models/Pagination";

const sleep = (delay: number) => {
    return new Promise((resolve) =>{
        setTimeout(resolve, delay);
    });
};

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers.authorization = `Bearer ${token}`;
    return config;
});

axios.interceptors.response.use(async response => {
    await sleep(500);
    
    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginatedResult(response.data, JSON.parse(pagination));
        return response as AxiosResponse<PaginatedResult<any>>;
    }
    
    return response
}, (error: AxiosError) => {
    const {data, status, config} = error.response!;

    switch (status) {
        case 400:
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                history.push('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('unauthorised');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;  
    }
    return Promise.reject(error);
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Activity[]>>('/activities', {params})
        .then(responseBody),
    details: (id: string) => request.get<Activity>(`/activities/${id}`),
    create: (activity: ActivityFormValues) => request.post<void>('/activities', activity),
    update: (activity: ActivityFormValues) => request.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => request.delete<void>(`/activities/${id}`),
    attend: (id: string) => request.post<void>(`/activities/${id}/attend`, {})
}

const Account = {
    current: () => request.get<User>('/account'),
    login: (user: UserFormValues) => request.post<User>('/account/login', user),
    register: (user: UserFormValues) => request.post<User>('/account/register', user),
}

const Profiles = {
    get: (userName: string) => request.get<Profile>(`/profiles/${userName}`),
    uploadPhoto: (file: Blob) => {
        let formData = new FormData();
        formData.append('formFile', file);
        return axios.post<Photo>('photos', formData, {
            headers: {'content-type': 'multipart/form-data'}
        });
    },
    setMainPhoto: (id: string) => request.post(`/photos/${id}/setMain`, {}),
    deletePhoto: (id: string) => request.delete(`/photos/${id}`),
    updateProfile: (profile: Partial<Profile>) => request.put(`/profiles`, profile),
    updateFollowing: (userName: string) => request.post(`/follow/${userName}`, {}),
    listFollowings: (userName: string, predicate: string) => request.get<Profile[]>(`/follow/${userName}?predicate=${predicate}`)
}

const Agent = {
    Activities,
    Account,
    Profiles
}

export default Agent;
