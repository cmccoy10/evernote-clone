import React, { useEffect, useState } from "react";
import "../Main/Main.css";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../../store/ducks/notes";
import Note from "./Note";
import Header from "./Header";

const NotesList = () => {
  const dispatch = useDispatch();
  const currentNotebookId = useSelector((state) => state.currentNotebook);
  const notes = useSelector((state) => state.notes);
  const notebooks = useSelector((state) => state.notebooks);

  const tags = useSelector((state) => state.tags);

  const allNotesListDiv = [];
  const filteredNotesDiv = [];
  //   if current notebook is null, display all

  // if current notebook is specified, display all notes that belong to that notebook
  Object.values(notes).map((note) => {
    const noteTags = [];

    note.tags.forEach((id) => {
      if (Object.keys(tags).includes(id.toString())) {
        noteTags.push(tags[id]);
      }
    });
    allNotesListDiv.push(<Note key={note.id} note={note} tags={noteTags} />);
  });

  console.log(" current notebook ", notebooks[currentNotebookId]);

  //   Object.values(notes).map((note) => {
  //  notebooks[currentNotebookId].notes.map((id) => {
  //    if (Object.keys())
  //    filteredNotesDiv.push(<Note key={note.id} note={note} tags={noteTags} />);
  //  });

  //   });

  return (
    <div className="notes-list-container">
      <Header />
      {allNotesListDiv}
    </div>
  );
};

export default NotesList;
