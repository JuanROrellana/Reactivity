import React, {SyntheticEvent} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Card, CardActions, CardContent, Link, Typography} from "@material-ui/core";
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";

const useStyles = makeStyles({
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
});

function ActivityList(){
    const classes = useStyles();
    const {activityStore} = useStore();
    const {deleteActivity, activitiesByDate} = activityStore;

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        deleteActivity(id);
    }

    return (
        <>
            {activitiesByDate.map(activity => (
                <Card className={classes.root} key={activity.id}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {activity.category}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {activity.title}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {activity.date}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {activity.description}
                            <br/>
                            {activity.venue} - {activity.city}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link href={`/activities/${activity.id}`} color="inherit" underline='none' >
                            <Button size="medium">View</Button>
                        </Link>
                        <Button size="medium"
                                name={activity.id}
                                onClick={(e) => handleActivityDelete(e, activity.id)}
                        >Delete</Button>
                    </CardActions>
                </Card>
            ))}
        </>
    );
}

export default observer(ActivityList);