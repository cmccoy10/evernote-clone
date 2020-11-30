import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    allnotes__notetagContainer: {
        display: 'flex',
        padding: '0px 10px 10px 10px',
        // backgroundColor: '#e0e0e0'
    },
    allnotes__notetag: {
    padding: '15px 15px',
    backgroundColor: '#e0e0e0',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    height: '20px',
    // width: '',
    // margin: '2px 4px 2px 4px'
    }
}))

const NoteTag = ({ tag }) => {

    const classes = useStyles()

    return (
        <div className={classes.allnotes__notetagContainer}>
            <div className={classes.allnotes__notetag}>{tag['name']}</div>
        </div>
    )
}

export default NoteTag;