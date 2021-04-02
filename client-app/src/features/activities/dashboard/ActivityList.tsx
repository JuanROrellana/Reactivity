import React, { Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import {useStore} from "../../../app/stores/store";
import ActivityListItem from "./ActivityListItem";

function ActivityList(){
    const { activityStore } = useStore();
    const { groupedActivities } = activityStore;

    return (
        <>
            {groupedActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <div><h3>{group}</h3></div>
                    {activities.map(activity => (
                        <ActivityListItem activity={activity} key={activity.id}/>
                    ))}
                </Fragment>
            ))}
        </>
    );
}

export default observer(ActivityList);