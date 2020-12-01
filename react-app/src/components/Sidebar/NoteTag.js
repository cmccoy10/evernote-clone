import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import CloseIcon from '@material-ui/icons/Close';
import Icon from '@material-ui/core/Icon';
import { setCurrentTag } from '../../store/ducks/currentTag';

const useStyles = makeStyles((theme) => ({
    allnotes__notetagContainer: {
        display: 'flex',
        alignItems: 'center',
        height: '60px',
        backgroundColor: '#e0e0e0',
        color: 'white'
    },
    allnotes__notetag: {
        padding: '15px 15px',
        backgroundColor: theme.palette.dark.main,
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '14px',
        height: '35px',
        marginLeft: '20px'
        // width: '',
        // margin: '2px 4px 2px 4px'
    },
    notetag__icon: {
        color: '#e0e0e0',
        marginRight: '10px'
    },
    notetag__close: {
        width: '20px',
        height: '20px',
        cursor: 'pointer'
    },
    otetag__closeCont: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))

const NoteTag = ({ tag }) => {
    const dispatch = useDispatch();

    const classes = useStyles()

    const handleClick = () => {
        dispatch(setCurrentTag(null))
    }

    return (
        <div className={classes.allnotes__notetagContainer}> 
            <div className={classes.allnotes__notetag}>
                <FontAwesomeIcon icon={faTag} className={classes.notetag__icon} />
                <div>{tag['name']}</div>
                <Icon className={classes.otetag__closeCont}>
                    <CloseIcon className={classes.notetag__close} onClick={handleClick} />
                </Icon>
            </div>
        </div>
    )
}

export default NoteTag;