import React from "react";
import {CircularProgress} from "@material-ui/core";

interface Props{
    inverted: boolean;
    content: string;
}

function LoadingComponent({inverted = true, content = 'Loading...'}: Props){
    return (
        <CircularProgress />
    );
}

export default LoadingComponent;