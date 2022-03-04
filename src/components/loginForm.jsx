import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import { getCurrentUser, login } from '../services/authService';

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };
  //   username = React.createRef();

  //   componentDidMount() {
  //     this.email.current.focus();
  //   }

  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async() => {
    try {   
      await login(this.state.data);
     const {state} =  this.props.location;
     window.location = state?state.from.pathname:'/';
    } catch (ex) {
      if (ex && ex.status === 400) {
        toast.error(ex.responseText);
      }
    }
  };

  render() {
    if(getCurrentUser()) return <Redirect to="/" />
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
