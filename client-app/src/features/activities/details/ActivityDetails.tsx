import React, {useEffect} from "react";
import {useParams} from 'react-router-dom';
import {Button, Card, CardActions, CardContent, Grid, Link, Paper, Typography} from "@material-ui/core";
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
    const {selectedActivity: activity, loadActivity} = activityStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if(id) loadActivity(id);
        },
        [id, loadActivity]);

    if(!activity || !activity) return <LoadingComponent inverted={false} content={''}/>;

    return(
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                        <ActivityDetailedHeader/>
                        <ActivityDetailedInfo/>
                        <ActivityDetailedChat/>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <ActivityDetailedSideBar/>
                    </Paper>
                </Grid>
            </Grid>
            {/*<Card className={classes.root}>*/}
            {/*    <CardContent>*/}
            {/*        <Typography variant="h5" component="h2">*/}
            {/*            {activity.title}*/}
            {/*        </Typography>*/}
            {/*        <Typography className={classes.title} color="textSecondary" gutterBottom>*/}
            {/*            {activity.category}*/}
            {/*        </Typography>*/}
            {/*        <Typography className={classes.pos} color="textSecondary">*/}
            {/*            {activity.date}*/}
            {/*        </Typography>*/}
            {/*        <Typography variant="body2" component="p">*/}
            {/*            {activity.description}*/}
            {/*            <br/>*/}
            {/*            {activity.venue} - {activity.city}*/}
            {/*        </Typography>*/}
            {/*    </CardContent>*/}
            {/*    <CardActions>*/}
            {/*        <Link href={`/manage/${activity.id}`} color="inherit" underline='none' >*/}
            {/*            <Button size="medium">Edit</Button>*/}
            {/*        </Link>*/}
            {/*        <Link href={`/activities`} color="inherit" underline='none' >*/}
            {/*            <Button size="medium">Cancel</Button>*/}
            {/*        </Link>*/}
            {/*    </CardActions>*/}
            {/*</Card>*/}
        </div>
    )
}

export default observer(ActivityDetails);