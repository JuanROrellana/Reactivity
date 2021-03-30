import React, {ChangeEvent, FormEvent, useState} from 'react';
import {FormControl, TextField} from "@material-ui/core";
import { Button } from '@material-ui/core';
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";

function ActivityForm() {
    const {activityStore} = useStore();
    const {selectedActivity, closeForm, createActivity, updateActivity} = activityStore;

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        description: '',
        category: '',
        city: '',
        venue: '',
        date: ''
    }

    const [activity, setActivity] = useState(initialState);

    function handleSubmit(event: FormEvent){
        event.preventDefault();
        activity.id ? updateActivity(activity) : createActivity(activity);
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>){
        const {id, value} = event.target;
        console.log('value',value);
        console.log('name',id);
        setActivity({...activity, [id]: value});
    }

    return(
        <div>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
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
                    <Button variant="contained" onClick={closeForm}>
                        Cancel
                    </Button>
                </FormControl>
            </form>
        </div>
    );
}

export default observer(ActivityForm);