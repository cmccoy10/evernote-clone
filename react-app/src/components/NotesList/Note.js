import React from 'react'

const Note = (props) => {
    const tagsList = []
    props.tags.forEach(tag => {
        tagsList.push(<li key={tag.id}>{tag.name}</li>)
    });
    return (
        <div>
            <h1>{props.note.title}</h1>
            <p>{props.note.body}</p>
            <small>Modified on {props.note.updated_on}</small>
            <ul>
                {tagsList}
            </ul>
        </div>
    )
}

export default Note