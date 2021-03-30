import React from "react";
import List from "@material-ui/core/List";
import ActivityList from "./ActivityList";
import {makeStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";

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

function ActivityDashboard() {
    const classes = useStyles();
    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore;

    return(
        <div className={classes.root}>
            <Grid container spacing={9}>
                <Grid item xs={6}>
                    <List component="nav" aria-label="main mailbox folders">
                        <ActivityList/>
                    </List>
                </Grid>
                <Grid item xs={6}>
                    {selectedActivity && !editMode &&
                    <ActivityDetails/>}
                    {editMode &&
                    <ActivityForm/>}
                </Grid>
            </Grid>
        </div>
    );
}

export default observer(ActivityDashboard);