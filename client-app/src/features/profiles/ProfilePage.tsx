import React, {useEffect} from "react";
import {Grid} from "semantic-ui-react";
import HeaderProfile from "./HeaderProfile";
import ProfileContent from "./ProfileContent";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {useStore} from "../../app/stores/store";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default observer(function ProfilePage(){
    const {userName} = useParams<{userName: string}>();
    const {profileStore} = useStore();
    const {profile, loadingProfile, loadProfile} = profileStore;

    useEffect(() => {
        loadProfile(userName);
    }, [loadProfile, userName])

    if (loadingProfile) return <LoadingComponent content='Loading profile...' />

    return(
        <Grid>
            <Grid.Column width={16}>
               <>
                   {profile && <HeaderProfile profile={profile} />}
                   {profile && <ProfileContent profile={profile} />}
               </>
            </Grid.Column>
        </Grid>
    );
})