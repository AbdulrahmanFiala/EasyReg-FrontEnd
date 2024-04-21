import React from "react";
import "./App.css";
import Register from "./components/Register";
import StudentList from "./components/StudentList";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/students" element={<StudentList />} />
    </Routes>
  );
}

export default App;
