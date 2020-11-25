import { baseUrl } from '../../config';

const LOAD_TAGS = 'clevernote/tags/load';
const NEW_TAG = 'clevernote/tags/new';
const REMOVE_TAG = 'clevernote/tags/remove';
const EDIT_TAG = 'clevernote/tags/edit';


export const loadTags = (tags) => ({
    type: LOAD_TAGS,
    tags
});

export const newTag = (tag) => ({
    type: NEW_TAG,
    tag
});

export const removeTag = (tagId) => ({
    type: REMOVE_TAG,
    tagId
});

export const editTag = (tag) => ({
    type: EDIT_TAG,
    tag
});


export const getTags = () => async (dispatch) => {

    const res = await fetch(`${baseUrl}/tags`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.ok) {
        const { tags } = await res.json();
        console.log(tags)
        let tagsList = {};
        tags.forEach(tag => {
            tagsList[tag.id] = tag
        });
        dispatch(loadTags(tagsList))
    }
}

export const createTag = (name) => async (dispatch) => {
    const res = await fetch(`${baseUrl}/tags`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
    })
    if (res.ok) {
        const { tag } = await res.json()
        dispatch(newTag(tag))
    }
}

export const deleteTag = (tagId) => async (dispatch) => {
    const res = await fetch(`${baseUrl}/tags/${tagId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        dispatch(removeTag(tagId))
    }
}

export const updateTag = (tagId, name) => async (dispatch) => {
    const res = await fetch(`${baseUrl}/tags/${tagId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
    })
    if (res.ok) {
        const { tag } = await res.json();
        dispatch(editTag(tag))
    }
}

export default function reducer(state = {}, action) {
    switch (action.type) {
        case LOAD_TAGS:
            return { ...action.tags }
        case NEW_TAG:
            let newState = { ...state }
            newState[action.tag.id] = action.tag 
            return { ...newState }
        case REMOVE_TAG:
            newState = { ...state }
            delete newState[action.tagId]
            return newState
        case EDIT_TAG:
            newState = { ...state }
            newState[action.tag.id] = action.tag 
            return { ...newState }
        default:
            return state;
    }
}