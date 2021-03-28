import React from "react";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

interface Props{
    openForm: () => void;
}

function NavBar({openForm}: Props){
    const classes = useStyles();
    return(
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                </IconButton>
                <Button size="medium" onClick={openForm}>
                    <Typography variant="h6" className={classes.title}>
                        Create Activity
                    </Typography>
                </Button>

                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
