import { useState } from "react";
import { onLogin } from "../api/auth";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../redux/slices/authSlice";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await onLogin(values);
      dispatch(authenticateUser());

      localStorage.setItem("isAuth", "true");
    } catch (error) {
      console.log(error.response.data.errors[0].msg);
      setError(error.response.data.errors[0].msg);
    }
  };

  return (
    <>
      <a href="/" button type="button" class="btn btn-info">
        Home
      </a>
      <section class="loginForm">
        <div class="container">
          <div class="row content">
            <div class="col-lg-5">
              <img
                src={require("../assets/logo.jpeg")}
                class="img-fluid"
                alt="LOGO"
              />
            </div>
            <div class="col-lg-7 px-3 pt-3">
              <h1 class="font-weight-bold py-3">FINAL PROJECT</h1>
              <h4 class="signin-text mb-3">Login</h4>
              <form onSubmit={(e) => onSubmit(e)}>
                <div class="form-row">
                  <div class="col-lg-7">
                    <input
                      onChange={(e) => onChange(e)}
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={values.email}
                      placeholder="Email Address"
                      required
                    />
                  </div>
                </div>
                <br />
                <div class="form-row">
                  <div class="col-lg-7">
                    <input
                      onChange={(e) => onChange(e)}
                      type="password"
                      value={values.password}
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="*******"
                      required
                    />
                  </div>
                </div>
                <div style={{ color: "red", margin: "10px 0" }}>{error}</div>
                <div class="form-row">
                  <div class="col-lg-7">
                    <button type="submit" class="btn btn-primary">
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
