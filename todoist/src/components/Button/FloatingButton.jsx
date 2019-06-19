import React from 'react';
import {makeStyles} from '@material-ui/core/styles/index';
import Fab from '@material-ui/core/Fab/index';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

export default function FloatingActionButton() {
    const classes = useStyles();

    return (
        <Fab size="large" color="primary" aria-label="Add" className={classes.fab}>
            <AddIcon/>
        </Fab>
    );
}