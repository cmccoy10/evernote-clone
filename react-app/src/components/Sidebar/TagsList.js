import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import ButtonBase from '@material-ui/core/ButtonBase';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Drawer from '@material-ui/core/Drawer';

import { makeStyles } from '@material-ui/core/styles';

import { createTag, getTags } from '../../store/ducks/tags';

import Tag from './Tag';

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

const useStyles = makeStyles(() => ({
    tagslist__container: {
        boxSizing: 'border-box',
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        padding: '15px',
        zIndex: '1'
    },
    tagslist__header: {
        width: '100%',
        marginTop: '15px',
        paddingBottom: '3px',
        fontFamily: 'arial',
        borderBottom: '2px solid black',
        fontSize: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    tagslist__list: {

    },
    tagslist__tagtitle: {
        margin: '5px'
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
    tagsdrawer: {
        width: '100%',
        flexShrink: 0,
    },
    drawerPaper: {
        width: '30%',
        position: 'absolute',
        left: '20%'
    },
}))


const TagsList = ({ openDrawer, setOpenDrawer }) => {
    const dispatch = useDispatch()
    const classes = useStyles()

    const [name, setName] = useState('')
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    
    const handleOpen = (e) => {
        setOpen(true);
    }
    
    const handleClose = (e) => {
        setOpen(false);
    }
    
    const handleNewTagSubmit = (e) => {
        e.preventDefault();
        dispatch(createTag(name))
        setOpen(false);
    }
    
    
    const body = (
        <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">Text in a modal</h2>
        <p id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </p>
        <TagsList />
        </div>
    );

    let tags = useSelector((state) => Object.values(state.tags))
    // tags = (tags)

    useEffect(() => {
        dispatch(getTags())
    }, [tags.length])

    return (
        <div>
        <Drawer 
        className={classes.tagsdrawer}
        variant="persistent"
        anchor="left"
        open={openDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}>
        <div className={classes.tagslist__container}>
            <div className={classes.tagslist__header}>
                <div>
                Tags
                </div>
                <IconButton onClick={handleOpen}>
                    <AddIcon />
                </IconButton>
            </div>
            <div className={classes.tagslist__list}>
                {tags.map(tag => {
                    return (
                        // <div key={tag.id}>
                        //     {(tag.name[0].toLowerCase() === tagTitle) ? null : <div className={classes.tagslist__tagtitle}>{tag.name[0].toUpperCase()}</div>}
                            <Tag tag={tag} key={tag.id} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
                        // </div>
                    )
                })}
            </div>
        </div>
        </Drawer>
        <Dialog open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" >
            <form className={classes.tagDialogBox} onSubmit={handleNewTagSubmit}>
                <div className={classes.tagDialogBox__header}>
                    <div>Create new tag</div>
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
                        Create
                    </Button>
                </div>
            </form>
        </Dialog>
        </div>
    )
}

export default TagsList;