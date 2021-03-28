import React, {useEffect, useState} from 'react';
import './style.css';
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import {Activity} from "../models/activity";
import {Container} from "@material-ui/core";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import {v4 as uuid} from 'uuid';

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
  const classes = useStyles();
  const URL = 'http://localhost:5000/Activities';

  useEffect(() => {
    axios.get<Activity[]>(URL).then(response => {
      setActivities(response.data);
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
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
        : setActivities([...activities, {...activity, id: uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id:string){
    setActivities(activities.filter(x => x.id !== id));
  }

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
            />
          </div>
        </Container>
      </div>
  );
}

export default App;
