import React, { Component } from "react";
import "bulma/css/bulma.css";

class Signup extends Component {
  state = {
    email: "",
    password: "",
  };

  updateEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  updatePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    console.log(this.props);
    this.props.onSignUp(email, password);
  };
  render() {
    return (
      <div className="box column is-half">
        <h1 className="title">SignUp</h1>
        <form onSubmit={this.onSubmit}>
          <div className="field">
            <div className="control">
              <input
                type="text"
                placeholder="Email"
                value={this.state.email}
                onChange={this.updateEmail}
                className="input"
              ></input>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.updatePassword}
                className="input"
              ></input>
            </div>
          </div>
          <button type="button" className="button is-fullwidth is-primary">
            SignUp
          </button>
        </form>
        <a role="button" onClick={this.props.gotoLogin}>
          Already have an account ? login
        </a>
      </div>
    );
  }
}

export default Signup;
