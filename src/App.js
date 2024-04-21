import React from "react";
import "./App.css";
import Register from "./components/Register";
import StudentList from "./components/StudentList";
import { Route, Routes } from "react-router-dom";
import StudentDetail from "./components/StudentDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/student/:id" element={<StudentDetail />} />
      </Routes>
    </>
  );
}

export default App;
