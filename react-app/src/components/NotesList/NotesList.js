import React, { useEffect,  useState } from "react";
import "../Main/Main.css";
import { useDispatch, useSelector } from 'react-redux'
import { getNotes } from '../../store/ducks/notes'
import Note from './Note'



const NotesList = () => {
  const dispatch = useDispatch()
  const currentNote = useSelector(state => state.currentNote)
  const notes = useSelector(state => state.notes)
  const tags = useSelector(state => state.tags)
  const [filter, setFilter] = useState({sortBy: "lastModified"})
  // useEffect(() => {
  //   (async () => await dispatch(getNotes()))()
  // }, [])
  const notesListDiv = []
  
  // Object.entries(tags).map(tag => {
  //   tag[]
  // })
  Object.entries(notes).map(note => {
    const noteTags = []
    // console.log(note[1].tags, 'tags')
    note[1].tags.forEach(id => {
      // console.log('id', id)
      // console.log(Object.keys(tags), 'keys')
      if (Object.keys(tags).includes(id.toString())) {
        // console.log('matchgrep', id)
        noteTags.push(tags[id])
      }
    })
    notesListDiv.push(<Note key={note[1].id} note={note[1]} tags={noteTags}/>)
  })
  return (
    <>
      {notesListDiv}
    </>
    // <div className="notes-list">
    //   <h3>All Notes</h3>
    //   <div className="flex">
    //     <div className="note">Note 1</div>
    //     <div className="note">Note 2</div>
    //     <div className="note">Note 3</div>
    //   </div>
    // </div>
  );
};

export default NotesList;
