import React from "react";
import { Link } from "react-router-dom";

const Student = ({ student }) => {
  return (
    <>
      <div className="col-sm-6 col-lg-4 mt-2">
        <div className="card">
          <div className="card-body">
            <Link
              to={`/students/${student.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h5 className="card-title">Name: {student.name} </h5>
              <p className="card-text">Email: {student.email} </p>
              <p className="card-text">Phone: {student.phone} </p>
              <p className="card-text">Age: {student.age} </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Student;
