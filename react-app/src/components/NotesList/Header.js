import React, { useEffect } from "react";
import "../Main/Main.css";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../../store/ducks/notes";
import Note from "./Note";

const Header = () => {
  const dispatch = useDispatch();
  const currentNote = useSelector((state) => state.currentNote);
  const currentNotebookId = useSelector((state) => state.currentNotebook);
  const currentNotebook = useSelector(
    (state) => state.notebooks[currentNotebookId]
  );
  const numNotes = useSelector((state) => Object.values(state.notes).length);
  const tags = useSelector((state) => state.tags);

  return (
    <div className="notes-header">
      <h3>{currentNotebook ? currentNotebook.title : "All Notes"}</h3>
      <span> {`${numNotes} notes`}</span>
    </div>
  );
};

export default Header;
