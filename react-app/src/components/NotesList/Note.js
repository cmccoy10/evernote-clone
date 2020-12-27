import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./NotesList.css";
import Chip from "@material-ui/core/Chip";
import { setCurrentNote } from "../../store/ducks/currentNote";
import moment from "moment";

const Note = (props) => {
  const dispatch = useDispatch();
  const currentNote = useSelector((state) => state.currentNote);
  const tagsList = [];
  props.tags.forEach((tag) => {
    tagsList.push(<Chip className="tagItem" key={tag.id} label={tag.name} />);
  });
  const { title, body, updated_on } = props.note;
//   const date = new Date(updated_on);
//   const options = {
//     day: "numeric",
//     month: "short",
//   };
  const date = moment(updated_on).format("MMM Do");
  const isSelected = currentNote == props.note.id ? true : false;
  const formattedTitle = title.replace(/<[^>]+>/g, "");
  const formattedBody = body.replace(/<\/?[^>]+(>|$)/g, "");

  return (
    <div
      onClick={() => dispatch(setCurrentNote(props.note.id))}
      className={isSelected ? "note-div__selected" : "note-div"}
    >
      <div className="note-container">
        <h3>
          <span>{formattedTitle ? formattedTitle : "Untitled"}</span>
        </h3>
        <p className="note-body-text">{formattedBody}</p>
        {/* <small>{date.toLocaleDateString("en-En", options)}</small> */}
        <small>{date}</small>
      </div>
      <div className="tagContainer">{tagsList}</div>
    </div>
  );
};

export default Note;
