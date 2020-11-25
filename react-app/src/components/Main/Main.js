import React from "react";

import Sidebar from "../Sidebar/Sidebar";
import NotesList from "../NotesList/NotesList";
import NoteEditor from "../NoteEditor/NoteEditor";
import "./Main.css";

const Main = () => {
  return (
    <div className="grid-container">
      <Sidebar />
      <NotesList />
      <NoteEditor />
    </div>
  );
};
export default Main;
