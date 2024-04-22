import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import {
  getStudent,
  updateStudent,
  deleteStudent,
} from "../api/StudentService";

const StudentDetail = ({ getAllStudents }) => {
  const [student, setStudent] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    age: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const removeStudent = async (id) => {
    try {
      await deleteStudent(id);
      navigate("/students");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStudent = async (id) => {
    try {
      const { data } = await getStudent(id);
      setStudent(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (event) => {
    setStudent({ ...student, [event.target.name]: event.target.value });
    console.log(student);
  };

  const onUpdateStudent = async (event) => {
    event.preventDefault();
    await updateStudent(student);
  };

  useEffect(() => {
    fetchStudent(id);
  }, []);

  return (
    <>
      <div className="container-fluid" id="update-container">
        <form onSubmit={onUpdateStudent}>
          <Link to="/students" className="link">
            <i className="bi bi-arrow-left"></i> Back to list
          </Link>

          <input type="hidden" value={student.id} name="id" id="id" />

          <div className="form-group">
            <label for="name">Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              id="name"
              aria-describedby="name"
              onChange={onChange}
              value={student.name}
              required
            />
          </div>
          <div className="form-group">
            <label for="email">Email</label>
            <input
              className="form-control"
              name="email"
              id="email"
              aria-describedby="email"
              onChange={onChange}
              value={student.email}
              type="email"
              required
            />
          </div>
          <div className="form-group">
            <label for="phone">Phone</label>
            <input
              className="form-control"
              name="phone"
              id="phone"
              aria-describedby="phone"
              onChange={onChange}
              value={student.phone}
              type="text"
              pattern="01[0-5]{1}[0-9]{8}"
              title="Please enter a valid Egyptian phone number."
              required
            />
          </div>
          <div className="form-group">
            <label for="age">Age</label>
            <input
              className="form-control"
              name="age"
              id="age"
              aria-describedby="age"
              onChange={onChange}
              value={student.age}
              type="number"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Update Student
          </button>
          <button
            type="button"
            onClick={() => removeStudent(id)}
            className="btn btn-danger"
          >
            Delete Student
          </button>
        </form>
      </div>
    </>
  );
};

export default StudentDetail;
