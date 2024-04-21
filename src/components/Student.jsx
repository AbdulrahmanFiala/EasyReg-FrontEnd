import React from "react";
import { Link } from "react-router-dom";

const Student = ({ student }) => {
  return (
    <>
      <div class="col-sm-6 col-lg-4 mt-2">
        <div class="card">
          <div class="card-body">
            <Link
              to={`/students/${student.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h5 class="card-title">Name: {student.name} </h5>
              <p class="card-text">Email: {student.email} </p>
              <p class="card-text">Phone: {student.phone} </p>
              <p class="card-text">Age: {student.age} </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Student;
