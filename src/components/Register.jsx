import React, { useState } from "react";
import { Link } from "react-router-dom";
import { saveStudent } from "../api/StudentService";

export default function App() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
  });

  const handleInputChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  const handleNewStudent = async (event) => {
    event.preventDefault();
    if (
      values.name &&
      values.email &&
      values.phone &&
      values.age &&
      values.age >= 16 &&
      values.age <= 80
    ) {
      setValid(true);
      try {
        await saveStudent(values);
      } catch (error) {
        console.log(error);
      }
    }
    setSubmitted(true);
  };

  return (
    <div className="reg-container">
      <div className="form-container">
        <h3 className="text-center">BUE Student Registration</h3>
        <form className="register-form" onSubmit={handleNewStudent}>
          {submitted && valid && (
            <div className="success-message">
              <h3>Welcome {values.name}</h3>
              <div> Your registration was successful! </div>
              <div className="text-center mt-3">
                <Link to="/students" className="btn btn-success">
                  Explore BUE Students
                </Link>
              </div>
            </div>
          )}
          {!valid && (
            <>
              <label htmlFor="name">Name</label>
              <input
                className="form-field"
                type="text"
                placeholder="Enter your name"
                name="name"
                id="name"
                value={values.name}
                onChange={handleInputChange}
              />
            </>
          )}
          {submitted && !values.name && (
            <span id="first-name-error">Please enter your name</span>
          )}

          {!valid && (
            <>
              <label for="email">Email</label>
              <input
                className="form-field"
                type="email"
                placeholder="Enter your email"
                name="email"
                id="email"
                value={values.email}
                onChange={handleInputChange}
              />
            </>
          )}

          {submitted && !values.email && (
            <span id="email-error">Please enter a valid email address</span>
          )}

          {!valid && (
            <>
              <label for="phone">Phone Number</label>
              <input
                className="form-field"
                type="text"
                placeholder="01XXXXXXXXX"
                name="phone"
                id="phone"
                value={values.phone}
                onChange={handleInputChange}
                pattern="^(010|011|012|015)\d{8}$"
                title="Please enter a valid Egyptian phone number starting with 010, 011, 012, or 015"
              />
            </>
          )}

          {submitted && !values.phone && (
            <span id="last-name-error">
              Please enter a valid Egyptian phone number
            </span>
          )}

          {!valid && (
            <>
              <label for="age">Age</label>
              <input
                className="form-field"
                type="number"
                placeholder="Enter your age"
                name="age"
                id="age"
                value={values.age}
                onChange={handleInputChange}
                required
              />
            </>
          )}

          {submitted &&
            (!values.age || values.age < 16 || values.age > 255) && (
              <span id="age-error">
                You must be between 16 and 80 years old
              </span>
            )}

          {!valid && (
            <button className="form-field" type="submit">
              Register
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
