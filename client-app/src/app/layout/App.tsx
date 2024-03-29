import React, {useEffect} from 'react';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import {Container} from "@material-ui/core";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import {observer} from "mobx-react-lite";
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestError";
import {ToastContainer} from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from '../../features/errors/ServerError';
import LoginForm from "../../features/users/LoginForm";
import {useStore} from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from '../common/modals/ModalContainer';
import ProfilePage from "../../features/profiles/ProfilePage";
import PrivateRoute from "./PrivateRoute";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: '100%',
    // maxWidth: 1024,
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
  },
}));

function App() {
    const classes = useStyles();
    const location = useLocation();
    const {commonStore, userStore} = useStore();

    useEffect(() => {
        if (commonStore.token) {
            userStore.getUser().finally(() => commonStore.setAppLoaded());
        } else {
            commonStore.setAppLoaded();
        }
    }, [commonStore, userStore])

    if (!commonStore.appLoaded) return <LoadingComponent inverted={false} content={''}/>;

    return (
        <>
            <ToastContainer position='bottom-right' hideProgressBar/>
            <ModalContainer />
            <Route exact path='/' component={HomePage}/>
            <Route path={'/(.+)'}
                   render={() => (
                       <>
                           <NavBar/>
                           <Container fixed>
                               <div className={classes.root}>
                                   <Switch>
                                       <PrivateRoute exact path='/activities' component={ActivityDashboard}/>
                                       <PrivateRoute path='/activities/:id' component={ActivityDetails}/>
                                       <PrivateRoute key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
                                       <PrivateRoute path='/profiles/:userName' component={ProfilePage}/>
                                       <PrivateRoute path='/errors' component={TestErrors}/>
                                       <Route path='/server-error' component={ServerError} />
                                       <Route path='/login' component={LoginForm} />
                                       <Route component={NotFound}/>
                                   </Switch>
                               </div>
                           </Container>
                       </>
                   )}
            >
            </Route>
        </>
    );
}

export default observer(App);
