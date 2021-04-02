import React, {useEffect} from "react";
import List from "@material-ui/core/List";
import ActivityList from "./ActivityList";
import {makeStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

function ActivityDashboard() {
    const {activityStore} = useStore();
    const {loadActivities, activityRegistry} = activityStore;


    useEffect(() => {
        if (activityRegistry.size <= 1) loadActivities();
    }, [activityRegistry.size, loadActivities]);

    if (activityStore.loadingInitial) return <LoadingComponent inverted={false} content={'None'}/>

    return(
        <div >
            <Grid container>
                <Grid item xs={12}>
                    <List component="nav" aria-label="main mailbox folders">
                        <ActivityList/>
                    </List>
                </Grid>
            </Grid>
        </div>
    );
}

export default observer(ActivityDashboard);