import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import {
  getStudent,
  updateStudent,
  deleteStudent,
} from "../api/StudentService";
import { toastError, toastSuccess } from "../api/ToastService";

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
      getAllStudents();
      navigate("/students");
      toastSuccess("Student deleted successfully");
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const fetchStudent = async (id) => {
    try {
      const { data } = await getStudent(id);
      setStudent(data);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const onChange = (event) => {
    setStudent({ ...student, [event.target.name]: event.target.value });
  };

  const onUpdateStudent = async (event) => {
    event.preventDefault();
    await updateStudent(student);
    fetchStudent(id);
    toastSuccess("Student Updated");
  };

  useEffect(() => {
    console.log(student.name);
    fetchStudent(id);
  }, []);

  return (
    <>
      <Link to="/students" className="link">
        <i className="bi bi-arrow-left"></i> Back to list
      </Link>
      <div className="profile">
        <div className="profile__details">
          <div className="profile__metadata">
            <p className="profile__name">{student?.name}</p>
          </div>
        </div>
        <div className="profile__settings">
          <div>
            <form onSubmit={onUpdateStudent} className="form">
              <div className="user-details">
                <input
                  type="hidden"
                  defaultValue={student?.id}
                  name="id"
                  required
                />
                <div className="input-box">
                  <span className="details">Name</span>
                  <input
                    type="text"
                    value={student?.name}
                    onChange={onChange}
                    name="name"
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Email</span>
                  <input
                    type="email"
                    value={student?.email}
                    onChange={onChange}
                    name="email"
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Phone</span>
                  <input
                    type="text"
                    value={student?.phone}
                    onChange={onChange}
                    pattern="01[0-5]{1}[0-9]{8}"
                    name="phone"
                    title="Please enter a valid Egyptian phone number."
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Age</span>
                  <input
                    type="number"
                    value={student?.age}
                    onChange={onChange}
                    name="age"
                    required
                  />
                </div>
              </div>
              <div className="form_footer">
                <button type="submit" className="btn">
                  Update Student
                </button>
                <button
                  type="button"
                  onClick={() => removeStudent(id)}
                  className="btn btn-danger"
                >
                  Delete Student
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDetail;
