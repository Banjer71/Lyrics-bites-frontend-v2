import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import FormInput from "./form-input";
import FormError from "./form-error";
import FormSuccess from "./form-success";
import GradientButton from "./gradient-button";
import Label from "./label";
import Card from "./card";
import Vinyl from "/vinyl_icon.svg";
import "./signup.css";
import { AuthContext } from "../context/AuthContext";

const initialValues = {
  nickName: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  nickName: Yup.string().required("Nick name is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SignUp = () => {
  const authContext = useContext(AuthContext);
  const [loginLoading, setLoginLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState();
  const [signupError, setSignupError] = useState();
  const [delayedRedirect, setDelayedRedirect] = useState(false);

  let navigate = useNavigate()

  const submitCredentials = async (credentials) => {
    try {
      setLoginLoading(true);
      const { data } = await axios.post(`${process.env.VITE_API_URL}/signup`, credentials);
      console.log(data);
      authContext.setAuthState(data);
      setSignupSuccess(data.message);
      setSignupError("");

      setTimeout(() => {

        setDelayedRedirect(true);
      }, 1000);
    } catch (error) {
      setLoginLoading(false);
      const { data } = error.response;
      setSignupError(data.message);
      setSignupSuccess("");
    }
  };


  useEffect(() => {
    if (delayedRedirect) {
      navigate("/displayAllSongs");
    }
  }, [delayedRedirect, navigate]);


  return (
    <>
      <section className="signup">
        <div className="gradient-bar" />
        <Card>
          <div className="signup-fields">
            <div className="signup-fields-wrapper">
              <div className="form-header">
                <div className="form-logo">
                  <img src={Vinyl} alt="Record icon for signup/login form" />
                </div>
                <h2 className="signup-title">Sign up for an account</h2>
                <p className="signup-text">
                  Already have an account? <Link to="/login">Log in Now</Link>
                </p>
              </div>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => submitCredentials(values)}
              >
                {() => (
                  <Form className="signup-form">
                    {signupSuccess && <FormSuccess text={signupSuccess} />}
                    {signupError && <FormError text={signupError} />}
                    <input type="hidden" name="remember" value="true" />
                    <div className="form-container">
                      <div className="signup-field">

                      <div className="nickname-field">
                          <Label text="Nickname" />
                          <FormInput
                            ariaLabel="Nickname"
                            name="nickName"
                            type="text"
                            placeholder="Nickname"
                          />
                        </div>
                       
                        <div className="firstname-field">
                          <Label text="First Name" />
                          <FormInput
                            ariaLabel="First Name"
                            name="firstName"
                            type="text"
                            placeholder="First Name"
                          />
                        </div>
                        <div className="lastname-field">
                          <Label text="Last Name" />

                          <FormInput
                            ariaLabel="Last Name"
                            name="lastName"
                            type="text"
                            placeholder="Last Name"
                          />
                        </div>
                        <div className="email-field">
                          <Label text="Email address" />

                          <FormInput
                            ariaLabel="Email address"
                            name="email"
                            type="email"
                            placeholder="Email address"
                          />
                        </div>
                        <div className="password-field">
                          <Label text="Password" />

                          <FormInput
                            ariaLabel="Password"
                            name="password"
                            type="password"
                            placeholder="Password"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="gradient-button">
                      <GradientButton
                        type="submit"
                        text="Sign Up"
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

export default SignUp;
