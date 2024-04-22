import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import {
  getStudent,
  updateStudent,
  deleteStudent,
} from "../api/StudentService";

const StudentDetail = () => {
  const [student, setStudent] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    age: "",
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const removeStudent = async (id) => {
    try {
      await deleteStudent(id);
      setDeleteSuccess(true);
      setTimeout(() => {
        navigate("/students");
      }, 1000);
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
  };

  const onUpdateStudent = async (event) => {
    event.preventDefault();
    try {
      await updateStudent(student);
      setUpdateSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudent(id);
  }, [id]);

  useEffect(() => {
    let timer;
    if (updateSuccess || deleteSuccess) {
      timer = setTimeout(() => {
        setUpdateSuccess(false);
        setDeleteSuccess(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [updateSuccess, deleteSuccess]);

  return (
    <>
      <div className="container-fluid" id="update-container">
        {updateSuccess && (
          <div className="alert alert-success" role="alert">
            Student updated successfully!
          </div>
        )}
        {deleteSuccess && (
          <div className="alert alert-success" role="alert">
            Student deleted successfully!
          </div>
        )}
        <form onSubmit={onUpdateStudent}>
          <Link
            to="/students"
            className="link"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <i className="bi bi-arrow-left"></i>
            Back to Student list
          </Link>

          <input type="hidden" value={student.id} name="id" id="id" />

          <div className="form-group">
            <label htmlFor="name">Name</label>
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
            <label htmlFor="email">Email</label>
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
            <label htmlFor="phone">Phone</label>
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
            <label htmlFor="age">Age</label>
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

          <button type="submit" className="btn btn-primary mt-2 ">
            Update Student
          </button>
          <button
            type="button"
            onClick={() => removeStudent(id)}
            className="btn btn-danger m-2 mb-0"
          >
            Delete Student
          </button>
        </form>
      </div>
    </>
  );
};

export default StudentDetail;
