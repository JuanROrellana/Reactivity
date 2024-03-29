import {User} from "./User";

export interface Profile {
    userName: string;
    displayName: string;
    image?: string;
    bio?: string;
    followerCount: number;
    followingCount: number;
    following: boolean;
    photos?: Photo[];
}

export class Profile implements Profile {
    constructor(user: User) {
        this.userName = user.userName;
        this.displayName = user.displayName;
        this.image = user.image;
    }
}

export interface Photo{
    id: string;
    url: string;
    isMain: boolean;
}