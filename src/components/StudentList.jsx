import React, { useEffect, useState } from "react";
import { getStudents } from "../api/StudentService";
import Student from "./Student";

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
    </main>
  );
};

export default StudentList;
