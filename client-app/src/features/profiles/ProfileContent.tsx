import React from "react";
import {Tab} from "semantic-ui-react";
import ProfilesPhoto from "./ProfilesPhoto";
import { useStore } from '../../app/stores/store';
import {Profile} from "../../app/models/Profile";
import ProfileAbout from './ProfileAbout';
import {observer} from "mobx-react-lite";
import ProfileFollowings from "./ProfileFollowings";

interface Props {
    profile: Profile;
}

export default observer(function ProfileContent({profile}: Props) {
    const {profileStore} = useStore();
    const panes = [
        {menuItem: 'About', render: () => <ProfileAbout />},
        {menuItem: 'Photos', render: () => <ProfilesPhoto profile={profile}/>},
        {menuItem: 'Events', render: () => <Tab.Pane>Events Content</Tab.Pane>},
        {menuItem: 'Followers', render: () => <ProfileFollowings />},
        {menuItem: 'Following', render: () => <ProfileFollowings />},
    ];
    return(
        <Tab
            menu={{fluid: true, vertical: true}}
            menuPosition='right'
            panes={panes}
            onTabChange={(e, data) => profileStore.setActiveTab(data.activeIndex)}
        />
    );
});