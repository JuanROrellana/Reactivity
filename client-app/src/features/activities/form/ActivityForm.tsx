import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {FormControl, Link, TextField} from "@material-ui/core";
import { Button } from '@material-ui/core';
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";
import {useParams, useHistory} from "react-router-dom";
import { v4 as uuid } from 'uuid';

function ActivityForm() {
    const {activityStore} = useStore();
    const history = useHistory();
    const {createActivity, updateActivity,
         loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();
    const [activity, setActivity] = useState({
        id: '',
        title: '',
        description: '',
        category: '',
        city: '',
        venue: '',
        date: ''
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity]);

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
        } else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
        }
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>){
        const {id, value} = event.target;
        setActivity({...activity, [id]: value});
    }

    // if(loadingInitial) return <LoadingComponent inverted={true} content={'None'}/>

    return(
        <div>
            <form noValidate autoComplete="off">
                <FormControl>
                    <TextField id="title" label="Title" value={activity.title} onChange={handleChange}/>
                </FormControl>
                <FormControl>
                    <TextField id="description" label="Description" value={activity.description} onChange={handleChange}/>
                </FormControl>
                <FormControl>
                    <TextField id="category" label="Category" value={activity.category} onChange={handleChange}/>
                </FormControl>
                <FormControl>
                    <TextField id="date" label="Date" value={activity.date} onChange={handleChange} type='date'/>
                </FormControl>
                <FormControl>
                    <TextField id="city" label="City" value={activity.city} onChange={handleChange}/>
                </FormControl>
                <FormControl>
                    <TextField id="venue" label="Venue" value={activity.venue} onChange={handleChange}/>
                </FormControl>
                <FormControl>
                    <Button type={"submit"}  variant="contained" color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Link href='/activities'>
                        <Button variant="contained">
                            Cancel
                        </Button>
                    </Link>
                </FormControl>
            </form>
        </div>
    );
}

export default observer(ActivityForm);