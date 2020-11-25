import React from "react";
import "../Main/Main.css";

const NotesList = () => {
  return (
    <div className="notes-list">
      <h3>All Notes</h3>
      <div className="flex">
        <div className="note">Note 1</div>
        <div className="note">Note 2</div>
        <div className="note">Note 3</div>
      </div>
    </div>
  );
};

export default NotesList;
