import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import Agent from "../api/agent";

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode: boolean = false;
    loading: boolean = false;
    loadingInitial: boolean = true

    constructor() {
        makeAutoObservable(this)
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values())
            .sort((a, b) => Date.parse(a.date) -  Date.parse(b.date))
    }

    loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await Agent.Activities.list();
            activities.forEach(activity => {
                this.setActivity(activity);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await Agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedActivity = activity;
                })
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await Agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await Agent.Activities.update(activity);
            runInAction((() => {
                this.activityRegistry.set(activity.id, activity)
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            }));
        } catch (error) {
            runInAction((() => {
                console.log(error)
                this.loading = false;
            }));
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await Agent.Activities.delete(id)
            runInAction(() => {
                this.activityRegistry.delete(id)
                this.loading = false;
            })
        } catch (error){
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}