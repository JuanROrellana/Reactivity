import React, {useEffect} from 'react';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import {Container} from "@material-ui/core";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import {useStore} from "../stores/store";
import {observer} from "mobx-react-lite";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 1024,
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
  },
}));

function App() {
  const { activityStore } = useStore();
  const classes = useStyles();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent inverted={false} content={'None'}/>

  return (
      <div>
        <NavBar/>
        <Container maxWidth="sm">
          <div className={classes.root}>
            <ActivityDashboard/>
          </div>
        </Container>
      </div>
  );
}

export default observer(App);
