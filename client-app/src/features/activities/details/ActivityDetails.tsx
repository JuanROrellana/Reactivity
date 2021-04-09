import React, {useEffect} from "react";
import {useParams} from 'react-router-dom';
import {Grid, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useStore} from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {observer} from "mobx-react-lite";
import ActivityDetailedInfo from "./ActivityDetailedinfo";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSideBar from "./ActivityDetailedSideBar";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function ActivityDetails(){
    const classes = useStyles();
    const {activityStore} = useStore();
    const {selectedActivity: activity, loadActivity, clearSelectedActivity} = activityStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if(id) loadActivity(id);
        return () => clearSelectedActivity();
        },
        [id, loadActivity, clearSelectedActivity]);

    if(!activity || !activity) return <LoadingComponent inverted={false} content={''}/>;

    return(
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                        <ActivityDetailedHeader activity={activity} />
                        <ActivityDetailedInfo activity={activity} />
                        <ActivityDetailedChat activityId={activity.id}/>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <ActivityDetailedSideBar activity={activity}/>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default observer(ActivityDetails);