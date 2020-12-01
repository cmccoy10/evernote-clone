import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';

import { updateTag, deleteTag } from '../../store/ducks/tags';
import { setCurrentTag } from '../../store/ducks/currentTag';
import { setCurrentNotebook } from "../../store/ducks/currentNotebook";


import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    tagButton: {
        borderRadius: '10px',
        minWidth: '30px',
        height: '25px',
        textTransform: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px',
        margin: '20px 5px 20px 5px'
    },
    tagButtonLabel: {
        color: 'white'
    },
    tagMenuButton: {
        height: '5px',
        width: '15px',
        backgroundColor: 'none',
        margin: '5px'
    },
    tagMenuItem: {
        margin: '5px'
    },
    smTagButton: {
        width: '15px',
        height: '15px',
        color: theme.palette.other.main,
        margin: '1px'
    },
    tagDialogBox: {
        width: '450px',
        height: '250px',
        padding: '25px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'space-between',
        justifyContent: 'space-between'
    },
    tagDialogBox__header: {
        fontWeight: 'bold',
        fontSize: '20px'
    },
    tagDialogBox__input: {
        display: 'flex',
        flexDirection: 'column'
    },
    tagDialogBox__inputBar: {
        border: '1px solid #2C3849',
        borderRadius: '5px',
        width: '375px',
        paddingLeft: '10px'
    },
    tagDialogBox__buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: '15px 5px 5px 5px',
        padding: '10px 0px 0px 0px',
        borderTop: '1px solid #d0d0d0'
    },
    tagButtons: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '10px'
    }
}))

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}


const Tag = ({ tag, setOpenDrawer, openDrawer }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [name, setName] = useState('')
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const currentTag = useSelector(state => state.currentTag)

    const handleOpen = (e) => {
        setOpen(true);
    }

    const handleClose = (e) => {
        setOpen(false);
    }

    const handleClick = async () => {
        setOpenDrawer(false)
        await dispatch(setCurrentTag(tag.id))
        await dispatch(setCurrentNotebook(null));
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">Text in a modal</h2>
        <p id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </p>
        <Tag />
        </div>
    );

    const handleDeleteTag = (id) => {
        if (id === currentTag) {
            dispatch(setCurrentTag(null))
        }
        dispatch(deleteTag(id))
    }

    const handleEditTagSubmit = (e) => {
        e.preventDefault();
        dispatch(updateTag(tag.id, name))
        setOpen(false);
    }

    return (
        <div>
            <Button className={classes.tagButton}>
                <div className={classes.tagbuttonLabel} onClick={handleClick}>
                    { tag.name }  ({tag.notes.length})
                </div>
                <div className={classes.tagButtons}>
                    <div onClick={handleOpen}>
                        <Icon className={classes.smTagButton}>
                            <EditIcon className={classes.smTagButton}/>
                        </Icon>
                    </div>
                    <div onClick={() => handleDeleteTag(tag.id)}>
                        <Icon className={classes.smTagButton}>
                            <DeleteIcon className={classes.smTagButton}/>
                        </Icon>
                    </div>
                </div>
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" >
                <form className={classes.tagDialogBox} onSubmit={handleEditTagSubmit}>
                    <div className={classes.tagDialogBox__header}>
                        <div>Edit tag</div>
                    </div>
                    <div className={classes.tagDialogBox__input}>
                        <div>Name</div>
                        <TextField className={classes.tagDialogBox__inputBar} value={name} onChange={(e) => setName(e.target.value)}>
                            
                        </TextField>
                    </div>
                    <div className={classes.tagDialogBox__buttons}>
                        <Button onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type='submit'>
                            Edit
                        </Button>
                    </div>
                </form>
            </Dialog>
            </div>
    )
}

export default Tag;