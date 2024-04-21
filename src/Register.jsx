import React, { useState } from "react";
import { Link } from "react-router-dom";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      values.name &&
      values.email &&
      values.phone &&
      values.age &&
      values.age >= 16
    ) {
      setValid(true);
    }
    setSubmitted(true);
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        {submitted && valid && (
          <div className="success-message">
            <h3>Welcome {values.name}</h3>
            <div> Your registration was successful! </div>
            <button className="form-field">
              <span>
                <Link
                  to="/students"
                  className="text-white text-decoration-none fw-bold"
                >
                  Explore BUE Students
                </Link>
              </span>
            </button>
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
              class="form-field"
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
              class="form-field"
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
              class="form-field"
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

        {submitted && (!values.age || values.age < 16 || values.age > 255) && (
          <span id="age-error">You must be between 16 and 80 years old</span>
        )}

        {!valid && (
          <button class="form-field" type="submit">
            Register
          </button>
        )}
      </form>
    </div>
  );
}