import { baseUrl } from '../../config';
import { removeTagRelation, addTagRelation } from './notes';

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

    const res = await fetch(`/api/tags`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.ok) {
        const { tags } = await res.json();
        let tagsList = {};
        tags.forEach(tag => {
            tagsList[tag.id] = tag
        });
        dispatch(loadTags(tagsList))
    } else {
        console.error(res)
    }
}

export const createTag = (name) => async (dispatch) => {
    const res = await fetch(`/api/tags`, {
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
    const res = await fetch(`/api/tags/${tagId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.ok) {
        dispatch(removeTag(tagId))
    }
}

export const updateTag = (tagId, name) => async (dispatch) => {
    const res = await fetch(`/api/tags/${tagId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
    })
    if (res.ok) {
        const tag = await res.json();
        dispatch(editTag(tag))
    }
}


export const removeTagNoteRelation = (tagId, noteId) =>  async (dispatch) => {
    const res = await fetch(`/api/notes/${noteId}/tags/${tagId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.ok) {
        const tag = await res.json();
        let idx = tag.notes.indexOf(noteId)
        tag.notes.splice(idx, 1)
        dispatch(editTag(tag))
        dispatch(removeTagRelation(tagId, noteId))
    }
}

export const newTagToNote = (name, noteId) => async (dispatch, getState) => {
    const res = await fetch(`/api/notes/${noteId}/tags`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
    })
    if (res.ok) {
        const tag = await res.json()
        if (tag.name) {
            dispatch(newTag(tag))
            dispatch(addTagRelation(tag.id, noteId))
        } else {
            console.log(tag)
            const tagId = tag.tag_id
            const { tags } = getState()
            const updatedTag = tags[tagId];
            updatedTag.notes.push(noteId)
            dispatch(editTag(updatedTag))
            dispatch(addTagRelation(tagId, noteId))
        }
    }
}

export default function reducer(state = {}, action) {
    let newState = {...state}
    switch (action.type) {
        case LOAD_TAGS:
            return { ...action.tags }
        case NEW_TAG:
            let tagId = action.tag.id.toString()
            newState[tagId] = action.tag 
            return { ...newState }
        case REMOVE_TAG:
            delete newState[action.tagId]
            return newState
        case EDIT_TAG:
            newState[action.tag.id] = action.tag
            return { ...newState }
        default:
            return state;
    }
}










// import { baseUrl } from '../../config';

// const LOAD_TAGS = 'clevernote/tags/load';
// const NEW_TAG = 'clevernote/tags/new';
// const REMOVE_TAG = 'clevernote/tags/remove';
// const EDIT_TAG = 'clevernote/tags/edit';


// export const loadTags = (tags) => ({
//     type: LOAD_TAGS,
//     tags
// });

// export const newTag = (tag) => ({
//     type: NEW_TAG,
//     tag
// });

// export const removeTag = (tagId) => ({
//     type: REMOVE_TAG,
//     tagId
// });

// export const editTag = (tag) => ({
//     type: EDIT_TAG,
//     tag
// });


// export const getTags = () => async (dispatch) => {

//     const res = await fetch(`/api/tags`, {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     if (res.ok) {
//         const { tags } = await res.json();
//         let tagsList = {};
//         tags.forEach(tag => {
//             tagsList[`"${tag.id}"`] = tag
//         });
//         dispatch(loadTags(tagsList))
//     } else {
//         console.error(res)
//     }
// }

// export const createTag = (name) => async (dispatch) => {
//     const res = await fetch(`/api/tags`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ name })
//     })
//     if (res.ok) {
//         const tag = await res.json()
//         console.log(tag)
//         dispatch(newTag(tag))
//     }
// }

// export const deleteTag = (tagId) => async (dispatch) => {
//     const res = await fetch(`/api/tags/${tagId}`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     if (res.ok) {
//         tagId = tagId.toString();
//         console.log(tagId)
//         dispatch(removeTag(tagId))
//     }
// }
// export const removeTagNoteRelation = (tagId, noteId) =>  async (dispatch) => {
//     const res = await fetch(`/api/notes/${noteId}/tags/${tagId}`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     if (res.ok) {
//         const tag = await res.json();
//         console.log('rem tag note rel: ', tag)
//         let idx = tag.notes.indexOf(noteId)
//         tag.notes.splice(idx, 1)
//         dispatch(editTag(tag))
//     }
// }

// export const updateTag = (tagId, name) => async (dispatch) => {
//     const res = await fetch(`/api/tags/${tagId}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ name })
//     })
//     if (res.ok) {
//         const tag = await res.json();
//         dispatch(editTag(tag))
//     }
// }

// export const newTagToNote = (name, noteId) => async (dispatch, getState) => {
//     const res = await fetch(`/api/notes/${noteId}/tags`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ name })
//     })
//     if (res.ok) {
//         const tag = await res.json()
//         if (tag.name) {
//             dispatch(newTag(tag))
//         } else {
//             console.log(tag)
//             const tagId = tag.tag_id.toString()
//             const { tags } = getState()
//             const updatedTag = tags[`"${tagId}"`];
//             updatedTag.notes.push(noteId)
//             dispatch(editTag(updatedTag))
//         }
//     }
// }

// export default function reducer(state = {}, action) {
//     let newState = {...state}
//     switch (action.type) {
//         case LOAD_TAGS:
//             return { ...action.tags }
//         case NEW_TAG:
//             let tagId = action.tag.id.toString()
//             newState[tagId] = action.tag 
//             return { ...newState }
//         case REMOVE_TAG:
//             delete newState[action.tagId]
//             return newState
//         case EDIT_TAG:
//             newState[`"${action.tag.id}"`] = action.tag
//             return { ...newState }
//         default:
//             return state;
//     }
// }