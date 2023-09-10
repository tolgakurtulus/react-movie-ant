import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./Pages/Main/index";
import Detail from "./Pages/Detail/index";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/result/:movideId" exact element={<Detail />} />
      </Routes>
    </div>
  );
}
export default App;
