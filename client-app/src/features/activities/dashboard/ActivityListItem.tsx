import React, {SyntheticEvent} from "react";
import {Button, Card, CardActions, CardContent, Link, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Activity} from "../../../app/models/activity";
import {format} from 'date-fns';
import {useStore} from "../../../app/stores/store";
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

interface Props{
    activity: Activity;
}

function ActivityListItem({activity}: Props){
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const {activityStore} = useStore();
    const {deleteActivity} = activityStore;

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        deleteActivity(id);
    }

    return(
        <Card className={classes.root} key={activity.id}>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    {activity.category}
                </Typography>
                <Typography variant="h5" component="h2">
                    {activity.title}
                </Typography>
                <Typography color="textSecondary">
                    {format(activity.date!, 'dd MMM yyyy h:mm aa')}
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
    );
}

export default ActivityListItem;