import React, { useEffect, useState } from "react";
import { getStudents } from "../api/StudentService";
import Student from "./Student";
import { Link } from "react-router-dom";

const StudentList = () => {
  const [data, setData] = useState({});

  const getAllStudents = async () => {
    try {
      const { data } = await getStudents();
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  return (
    <main className="student-list">
      {data?.length === 0 && <div>No Contacts. Please add a new contact</div>}
      <div className="row">
        <h2 className="text-center">BUE Registered Students</h2>
        {data?.length > 0 &&
          data.map((student) => {
            return <Student student={student} key={student.id} />;
          })}
      </div>
      <div className="text-center mt-3">
        <Link to="/register" className="btn btn-success">
          Back to Registration
        </Link>
      </div>
    </main>
  );
};

export default StudentList;
