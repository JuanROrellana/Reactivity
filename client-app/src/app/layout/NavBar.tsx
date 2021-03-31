import React from "react";
import {AppBar, Button, Link, Menu, MenuItem, Toolbar} from "@material-ui/core";

function NavBar(){
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return(
        <AppBar position="static">
            <Toolbar>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} color="inherit">
                    Menu
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <Link href="/" color="inherit" underline='none'>
                        <MenuItem>Home</MenuItem>
                    </Link>
                    <Link href="/activities" color="inherit" underline='none'>
                        <MenuItem>Activities</MenuItem>
                    </Link>
                    <Link href="/createActivities" color="inherit" underline='none'>
                        <MenuItem>Create Activity</MenuItem>
                    </Link>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
