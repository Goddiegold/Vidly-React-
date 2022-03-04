import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import { loginWithJwt,getCurrentUser } from "../services/authService";
import { register } from "../services/userService";

class RegisterForm extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().label("Email").email(),
    password: Joi.string().required().label("Password").min(5),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async() => {
    try {
      const {token:jwt} = await register(this.state.data);
      loginWithJwt(jwt);
      window.location = '/';
    } catch (ex) {
      if (ex && ex.status===400) {
        toast.error(ex.responseText);
      }
   }
  };

  render() {
     if (getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
