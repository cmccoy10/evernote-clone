{
    user: {
        id,
        first_name,
        last_name,
        email
    },
    notebooks: {
        notebook_id: {
            title,
            owner_id,
            is_default,
            notes: ["note_id"]
        }
    },
    notes: {
        note_id: {
            title,
            body,
            user_id,
            notebook_id,
            modified_on,
            tags: ["tag_id"]
        }
    },
    tags: {
        tag_id: {
            name,
            user_id,
            notes: ["note_id"]
        }
    },
    currentNote: {
        note_id || null
    }
}
