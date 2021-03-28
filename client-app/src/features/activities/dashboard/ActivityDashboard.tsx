import React from "react";
import List from "@material-ui/core/List";
import {Activity} from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import {makeStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

interface Props{
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
}

function ActivityDashboard({activities, selectedActivity, selectActivity, cancelActivity, editMode, openForm, closeForm, createOrEdit,
                               deleteActivity}: Props) {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <Grid container spacing={9}>
                <Grid item xs={6}>
                    <List component="nav" aria-label="main mailbox folders">
                        <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity}/>
                    </List>
                </Grid>
                <Grid item xs={6}>
                    {selectedActivity && !editMode &&
                    <ActivityDetails
                        activity={selectedActivity}
                        cancelActivity={cancelActivity}
                        openForm={openForm}
                    />}
                    {editMode &&
                    <ActivityForm closeForm={closeForm} selectedActivity={selectedActivity} createOrEdit={createOrEdit}/>}
                </Grid>
            </Grid>
        </div>
    );
}

export default ActivityDashboard;