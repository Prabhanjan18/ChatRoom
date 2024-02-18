import React, { Component } from "react";
import "bulma/css/bulma.css";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
  };

  Login = (e) => {
    e.preventDefault();
    this.props.onLogin(this.state.email, this.state.password);
    this.setState({
      email: "",
      password: "",
    });
  };
  render() {
    return (
      <div className="box column is-half">
        <h1 className="title">Login</h1>
        <form onSubmit={this.Login}>
          <div className="field">
            <div className="control">
              <input
                type="email"
                placeholder="Enter mail"
                value={this.state.email}
                onChange={(e) => {
                  this.setState({
                    ...this.state,
                    email: e.target.value,
                  });
                }}
                className="input"
              ></input>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input
                type="password"
                placeholder="Enter password"
                value={this.state.password}
                onChange={(e) => {
                  this.setState({
                    ...this.state,
                    password: e.target.value,
                  });
                }}
                className="input"
              ></input>
            </div>
          </div>
          <button type="submit" className="button is-fullwidth is-primary">
            Login
          </button>
        </form>
        <a role="button" onClick={this.props.gotoSignUp}>
          Dont have account ? Signup !
        </a>
      </div>
    );
  }
}

export default LoginForm;
