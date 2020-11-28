import React, { useState, useEffect } from "react";
import NoteFooter from "./NoteFooter";
import NoteHeader from "./NoteHeader";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import ReactQuill from "react-quill";
import "./NoteEditor.css";
import { useSelector } from "react-redux";
import { createNote } from "../../store/ducks/notes";

const useStyles = makeStyles((theme) => ({
  richTextEditorContainer: {
    display: "flex",
    flexDirection: "column",
  },
  headerContainer: {
    height: "8vh",
    border: "thin solid black",
  },
  editorContainer: {
    // height: '90vh',
    border: "thin solid black",
  },
  footerContainer: {
    height: "6vh",
    border: "thin solid black",
  },
}));

const NoteEditorContainer = ({ message }) => {
  const currentNote = useSelector((state) => state.currentNote);
  const [text, setText] = useState(message);
  const [edited, setEdited] = useState(false);

  console.log("message", message);
  const handleChange = (value) => {
    setText(value);
    setEdited(true);
  };

  const handleCancel = () => {
    // dispatch();
  };

  useEffect(() => {
    setText(message);
  }, [message]);

  return (
    <Box className="richTextEditorContainer">
      <Box className="headerContainer">
        <NoteHeader
          note={text}
          id={currentNote}
          edited={edited}
          handleCancel={handleCancel}
        />
      </Box>
      <Box className="editorContainer">
        <ReactQuill placeholder="Title" value={text} onChange={handleChange} />
      </Box>
      <Box className="footerContainer">
        <NoteFooter />
      </Box>
    </Box>
  );
};

export default NoteEditorContainer;
