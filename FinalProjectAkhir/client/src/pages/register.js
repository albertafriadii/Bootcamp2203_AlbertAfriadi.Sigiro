import { useState } from "react";
import { onRegistration } from "../api/auth";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await onRegistration(values);

      setError("");
      setSuccess(data.message);
      setValues({ name: "", email: "", password: "", role: "" });
      window.location = "/users";
    } catch (error) {
      console.log(error.response.data.errors[0].msg);
      setError(error.response.data.errors[0].msg);
      setSuccess("");
    }
  };

  return (
    <>
      <form onSubmit={(e) => onSubmit(e)} className="container mt-3">
        <h1>Register</h1>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nama
          </label>
          <input
            onChange={(e) => onChange(e)}
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={values.name}
            placeholder="Nama"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            onChange={(e) => onChange(e)}
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={values.email}
            placeholder="example@gmail.com"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={(e) => onChange(e)}
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={values.password}
            placeholder="******"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <br />
          <input
            onChange={(e) => onChange(e)}
            type="radio"
            // className="form-control"
            id="admin"
            name="role"
            value={(values.role = "admin")}
            required
          />
          Admin
          <br />
          <input
            onChange={(e) => onChange(e)}
            type="radio"
            // className="form-control"
            id="user"
            name="role"
            value={(values.role = "user")}
            required
          />
          User
        </div>

        <div style={{ color: "red", margin: "10px 0" }}>{error}</div>
        <div style={{ color: "green", margin: "10px 0" }}>{success}</div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default Register;
