import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import SvgIcon from '@material-ui/core/SvgIcon';


import { newTagToNote, removeTagNoteRelation, getTags } from '../../store/ducks/tags';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    noteFooter: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        overflow: 'none',
        padding: '5px 0px 0px 0px',
        marginBottom: '10px'
    },
    notefooter__tags: {
        maxWidth: '80%',
        display: 'flex',
        overflow: 'none',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '10px'
        // margin: '0px 5px 0px 5px',
        // paddingTop: '3px',
    },
    notefooter__tag: {
        // padding: '15px 15px',
        backgroundColor: '#e0e0e0',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '14px',
        height: '30px',
        padding: '6px 8px 6px 8px',
        margin: '0px 4px 0px 4px'

    },
    notefooter__deleteicon: {
        width: '15px',
        height: '15px',
        marginLeft: '5px'
    },
    notefooter__deleteiconButton: {
        width: '15px',
        height: '15px',
    },
    noteFooter__newTagForm: {
        maxWidth: '20%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '20px',
        margin: '2px 4px 0px 4px',
    },
    noteFooter__newTagInput: {
        outline: 'none',
        textDecoration: 'none',
        width: '100%',
        padding: '15px 15px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        fontSize: '14px',
        height: '100%',
        marginTop: '2px',
        marginBottom: '0px !important',
        borderColor: "#e0e0e0"
    }
}));


const NoteFooter = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [name, setName] = useState('')

    const notes = useSelector(state => state.notes)
    const allTags = useSelector(state => state.tags)
    const id = useSelector(state => state.currentNote)

    let note = notes[id];
    let tags = note.tags
    const tagsArr = tags.map(tag => {
        return allTags[tag]
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const tagNames = tagsArr.map(tag => tag.name)
        if (!tagNames.includes(name)) {
            await dispatch(newTagToNote(name, note.id))
        }
        setName('')
    }

    const handleDelete = (tagId) => {
        dispatch(removeTagNoteRelation(tagId, note.id))
    }

    const newTagForm = () => (
        <form onSubmit={handleSubmit} className={classes.noteFooter__newTagForm}>
            <input className={classes.noteFooter__newTagInput} value={name} onChange={(e) => setName(e.target.value)} placeholder='Add tag' />
        </form>
    )

    if (!Object.values(allTags).length) {
        return (
            <div className={classes.noteFooter}>
                {newTagForm()}
            </div>
        )
    }


    return (
        <div className={classes.noteFooter}>
            <div className={classes.notefooter__tags}>
                {tagsArr.length < 0 ? null : tagsArr.map(tag => {
                    return (
                        <div className={classes.notefooter__tag} key={tag.id}>
                            <div className={classes.notefooter__tagname}>{tag['name']}</div>
                            <IconButton size="small" onClick={() => handleDelete(tag['id'])} className={classes.notefooter__deleteiconButton}>
                                <CloseIcon className={classes.notefooter__deleteicon}/>
                            </IconButton>
                        </div>
                    )
                })}
            </div>
            {newTagForm()}
        </div>
    );
}

export default NoteFooter;
