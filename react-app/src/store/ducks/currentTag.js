const CURRENT_TAG = 'clevernote/tags/current';

export const setCurrentTag = (tagId) => ({
    type: CURRENT_TAG,
    tagId
})


export default function currentTagReducer(state = null, action) {
    switch (action.type) {
        case CURRENT_TAG:
            return action.tagId;
        default:
            return state;
    }
}