import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import FormInput from "../signup/form-input";
import FormError from "../signup/form-error";
import FormSuccess from "../signup/form-success";
import GradientButton from "../signup/gradient-button";
import Label from "../signup/label";
import Card from "../signup/card";
import Vinyl from "/vinyl_icon.svg";
import { AuthContext } from "../context/AuthContext";
import "./login.css";

const initialValues = {
  email: "",
  password: "",
};

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const authContext = useContext(AuthContext);
  const [loginSuccess, setLoginSuccess] = useState();
  const [loginError, setLoginError] = useState();
  const [loginLoading, setLoginLoading] = useState(false);
  const [redirectOnLogin, setRedirectOnLogin] = useState(false);

  let navigate = useNavigate()

  const submitCredentials = async (credentials) => {
    try {
      setLoginLoading(true);
      const { data } = await axios.post(`${process.env.VITE_API_URL}/authenticate`, credentials);
      console.log(data);
      authContext.setAuthState(data);
      setLoginSuccess(data.message);
      setLoginError("");
      setTimeout(() => {
        setRedirectOnLogin(true);
      }, 700);
    } catch (error) {
      setLoginLoading(false);
      const { data } = error.response;
      setLoginError(data.message);
      setLoginSuccess(null);
    }
  };

  return (
    <>
      {redirectOnLogin && navigate("/displayAllSongs")}
      <section className="login">
        <div className="gradient-bar" />
        <Card>
          <div className="login-fields">
            <div className="login-fields-wrapper">
              <div>
                <div className="form-logo">
                  <img src={Vinyl} alt="Logo" />
                </div>
                <h2 className="login-title">Log in to your account</h2>
                <p className="login-text">
                  Don't have an account? <Link to="/signup">Sign up now</Link>
                </p>
              </div>

              <Formik
                initialValues={initialValues}
                onSubmit={(values) => submitCredentials(values)}
                validationSchema={LoginSchema}
              >
                {() => (
                  <Form className="login-form">
                    {loginSuccess && <FormSuccess text={loginSuccess} />}
                    {loginError && <FormError text={loginError} />}
                    <div>
                      <div className="login-container">
                        <div className="login-email">
                          <Label text="Email" />
                        </div>
                        <FormInput
                          ariaLabel="Email"
                          name="email"
                          type="text"
                          placeholder="Email"
                        />
                      </div>
                      <div>
                        <div className="mb-1">
                          <Label text="Password" />
                        </div>
                        <FormInput
                          ariaLabel="Password"
                          name="password"
                          type="password"
                          placeholder="Password"
                        />
                      </div>
                    </div>

                    <div className="login-forgot-password">
                      <div className="login-forgot-passowrd-link">
                        <Link
                          to="forgot-password"
                          text="Forgot your password?"
                        />
                      </div>
                    </div>

                    <div className="gradient-button">
                      <GradientButton
                        type="submit"
                        text="Log In"
                        loading={loginLoading}
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;