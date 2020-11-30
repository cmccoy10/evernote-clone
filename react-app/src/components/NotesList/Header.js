import React from "react";
import "../Main/Main.css";
import { useSelector } from "react-redux";

const Header = (props) => {
  const currentNotebookId = useSelector((state) => state.currentNotebook);
  const currentNotebook = useSelector(
    (state) => state.notebooks[currentNotebookId]
  );

  return (
    <div className="notes-header">
      <h3>{currentNotebook ? currentNotebook.title : "All Notes"}</h3>
      <span> {`${props.numNotes} notes`}</span>
    </div>
  );
};

export default Header;
