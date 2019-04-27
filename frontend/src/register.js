import React from "react";
import axios from "axios";

class Register extends React.Component {
  regUser() {
    var data = {
      username: this.state.username,
      password: this.state.password
    };
    axios
      .post("http://localhost:9000/register", data)
      .then(res => {
        if (res.status === 200) {
          console.log("Uspesna registracija " + res.data.username);
          // res.redirect('http://localhost:3000/about/');
          window.location.replace("http://localhost:3000/login/");
        }
      })
      .catch(error => {
        if (error.response.status === 401 || error.response.status === 403) {
          window.location.replace("http://localhost:3000/error/");
        }
      });
  }

  handleChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }
  render() {
    return (
      <div className="container" style={{ width: "50%" }}>
        <br />
        <div style={{ textAlign: "center", paddingTop: 80 }}>
          <label style={{ color: "rgb(179, 179, 204)", fontSize: 30 }}>
            Register page
          </label>
        </div>
        <br />
        <input
          placeholder="Please type username"
          style={{ textAlign: "center" }}
          className="form-control"
          name="username"
          onChange={e => this.handleChangeUsername(e)}
        />
        <br />
        <input
          placeholder="Please type password"
          style={{ textAlign: "center" }}
          className="form-control"
          name="password"
          onChange={e => this.handleChangePassword(e)}
        />
        <br />
        <div style={{ textAlign: "center" }}>
          <button
            className="btn btn-success btn-md"
            onClick={e => this.regUser(e)}
          >
            Register
          </button>
        </div>
      </div>
    );
  }
}

export default Register;
