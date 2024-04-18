import React from "react";
import "./App.css";
import Register from "./Register";
import Students from "./Students";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/students" element={<Students />} />
      </Routes>
    </>
  );
}

export default App;
