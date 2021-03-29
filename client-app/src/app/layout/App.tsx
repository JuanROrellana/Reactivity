import React, {useEffect, useState} from 'react';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import {Activity} from "../models/activity";
import {Container} from "@material-ui/core";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import {v4 as uuid} from 'uuid';
import Agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 1024,
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
  },
}));

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    Agent.Activities.list().then(response => {
      let activities: Activity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })
      setActivities(activities);
      setLoading(false);
    });
  }, []);

  function handleSelectedActivity(id: string){
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectedActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string){
    id ? handleSelectedActivity(id) : handleCancelSelectedActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrUpdateActivity(activity: Activity){
    setSubmitting(true);

    if(activity.id){
      Agent.Activities.update(activity).then(() => {
        // setActivities([...activities, {...activity, id: uuid()}]);
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      })
    }else{
      activity.id = uuid();
      Agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      });
    }
  }

  function handleDeleteActivity(id:string){
    setSubmitting(true);
    Agent.Activities.delete(id).then(() => {
      setActivities(activities.filter(x => x.id !== id));
      setSubmitting(false);
    });
  }

  if (loading) return <LoadingComponent inverted={false} content={'None'}/>

  return (
      <div>
        <NavBar openForm={handleFormOpen}/>
        <Container maxWidth="sm">
          <div className={classes.root}>
            <ActivityDashboard
                activities={activities}
                selectedActivity={selectedActivity}
                selectActivity={handleSelectedActivity}
                cancelActivity={handleCancelSelectedActivity}
                editMode={editMode}
                openForm={handleFormOpen}
                closeForm={handleFormClose}
                createOrEdit={handleCreateOrUpdateActivity}
                deleteActivity={handleDeleteActivity}
                submitting={submitting}
            />
          </div>
        </Container>
      </div>
  );
}

export default App;
