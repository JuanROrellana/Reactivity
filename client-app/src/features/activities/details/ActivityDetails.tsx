import React from "react";
import {Button, Card, CardActions, CardContent, Typography} from "@material-ui/core";
import {Activity} from "../../../app/models/activity";
import {makeStyles} from "@material-ui/core/styles";

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
    activity: Activity;
    cancelActivity: () => void;
    openForm: (id: string) => void;
}

function ActivityDetails({activity, cancelActivity, openForm}: Props){
    const classes = useStyles();
    return(
        <>
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {activity.title}
                    </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {activity.category}
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
                    <Button size="medium" onClick={() => openForm(activity.id)}>Edit</Button>
                    <Button size="medium" onClick={cancelActivity}>Cancel</Button>
                </CardActions>
            </Card>
        </>
    )
}

export default ActivityDetails;