import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import React from "react";
import { useFormik } from "formik";

const validateUserForm = () => {
  const initialValues = {
    email: "",
    username: "",
    password: "",
  };
  const onSubmit = (values) => {
    console.log("onSubmit", values);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email adress"),
    password: Yup.string().required("Password is required"),
    username: Yup.string().required("Username is required"),
  });
  const formik = useFormik({
     initialValues: {
       email: "",
       username: "",
     password: "",
    },
     onSubmit: (values) => {
     console.log("onSubmit", values);
     },
    validationSchema: Yup.object({
      email: Yup.string()
       .required("Email is required")
        .email("Invalid email adress"),
      password: Yup.string().required("Password is required"),
     username: Yup.string().required("Username is required"),
     }),
   validate: (values) => {
    const errors = {};
     if (!values.email) {
       errors.email = "Email is required";
     }
     if (!values.username) {
       errors.username = "Username is required";
     }
     if (!values.password) {
       errors.password = "Password is required";
     }
    return errors;
   },
   });
  return (
    <div>
      <h1>Log in</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {() => (
          <Form>
            <div className="field">
              <Field name="email" placeholder="Email" />

              <div className="error">
                <ErrorMessage name="email" component="span" />
              </div>
            </div>
            <div className="field">
              <Field name="username" placeholder="Username" />
              <div className="error">
                <ErrorMessage name="username" component="span" />
              </div>
            </div>
            <div className="field">
              <Field name="password" placeholder="Password" type="password" />
              <div className="error">
                <ErrorMessage name="password" component="span" />
              </div>
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
    
  );
};

const errorLoadForm = () => {
  return (
    <div>
      <h1>Error 404</h1>
    </div>
  );
}


export const PageError = () => errorLoadForm();
export const PageLogin = () => validateUserForm();
