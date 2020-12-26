import React from "react";
import "../Main/Main.css";
import { useSelector } from "react-redux";
import Note from "./Note";
import Header from "./Header";
import NoteTag from '../Sidebar/NoteTag';

const NotesList = () => {
  const currentNotebookId = useSelector((state) => state.currentNotebook);
  let notes = useSelector((state) => state.notes);
  const notebooks = useSelector((state) => state.notebooks);
  const tags = useSelector((state) => state.tags);
  const currentTag = useSelector((state) => state.currentTag);


  const allNotesListDiv = [];
  const filteredNotesDiv = [];
  let tag;

  if (currentTag) {
    tag = tags[currentTag]
    const tagNotes = {};
    tag.notes.forEach(note => {
      tagNotes[note] = notes[note]
    })
      notes = tagNotes;
    }

    let numNotes = Object.values(notes).length;


  const sortedAllNotes = Object.values(notes).sort(function (a, b) {
    const aDate = Date.parse(a.updated_on);
    const bDate = Date.parse(b.updated_on);
    if (aDate < bDate) {
        return 1
    }

    if (aDate > bDate) {
        return -1
    }

    return 0;
  });

  sortedAllNotes.map((note) => {
    const noteTags = [];
    note.tags.forEach((id) => {
      if (Object.keys(tags).includes(id.toString())) {
        noteTags.push(tags[id]);
      }
    });
    allNotesListDiv.push(<Note key={note.id} note={note} tags={noteTags} />);
  });

  if (currentNotebookId) {
    // const noteTags = [];
    const filteredNotes = [];

    notebooks[currentNotebookId].notes.map((id) => {
      if (Object.keys(notes).includes(id.toString())) {
        filteredNotes.push(notes[id]);
      }
    });

    const sortedFilteredNotes = filteredNotes.sort(function (a, b) {
        const aDate = Date.parse(a.updated_on);
        const bDate = Date.parse(b.updated_on);
        if (aDate < bDate) {
            return 1
        }

        if (aDate > bDate) {
            return -1
        }

        return 0;
    });

    sortedFilteredNotes.forEach(note => {
      let noteTags = [];
        note.tags.forEach((id) => {
            if (Object.keys(tags).includes(id.toString())) {
                noteTags.push(tags[id]);
            }
        });
        filteredNotesDiv.push(
            <Note key={note.id} note={note} tags={noteTags} />
        );
    })
    numNotes = sortedFilteredNotes.length;
  }

  return (
    <div className="notes-list-container">
      <Header numNotes={numNotes} />
      { !currentTag ? null : <NoteTag tag={tag} key={tag.id} /> }
      {currentNotebookId ? filteredNotesDiv : allNotesListDiv}
    </div>
  );
};

export default NotesList;
