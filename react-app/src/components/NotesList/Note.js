import React from "react";
import "./NotesList.css";

const Note = (props) => {
  const tagsList = [];
  props.tags.forEach((tag) => {
    tagsList.push(<li key={tag.id}>{tag.name}</li>);
  });
  const { title, body, updated_on } = props.note;

  const formattedTitle = title.replace(/<[^>]+>/g, "");
  return (
    <div className="note-container">
      <span>{formattedTitle ? formattedTitle : "Untitled"}</span>
      <p>{body}</p>
      <small>{updated_on}</small>
      <ul>{tagsList}</ul>
    </div>
  );
};

export default Note;
