import React from "react";
import {Activity} from "../../../app/models/activity";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Card, CardActions, CardContent, Typography} from "@material-ui/core";


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

interface Props{
    activities: Activity[];
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
}

function ActivityList({activities, selectActivity, deleteActivity}: Props){
    const classes = useStyles();
    return (
        <>
            {activities.map(activity => (
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
                        <Button size="medium" onClick={() => selectActivity(activity.id)}>View</Button>
                        <Button size="medium" onClick={() => deleteActivity(activity.id)}>Delete</Button>
                    </CardActions>
                </Card>
            ))}
        </>
    );
}

export default ActivityList;