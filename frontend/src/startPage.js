import React from "react";

class startPage extends React.Component {
  redirectLogin(params) {
    window.location.replace("/login");
  }

  redirectRegister(params) {
    window.location.replace("/register");
  }
  render() {
    return (
      <div className="container" style={{ textAlign: "center" }}>
        <br />
        <div>
          <label
            style={{
              color: "rgb(179, 179, 204)",
              fontSize: 40,
              paddingTop: 70
            }}
          >
            Welcome to my first Node.js - React application
          </label>
        </div>
        <br />
        <div>
          <img src={require("./images/siteImg.png")} width="500" alt="" />
        </div>
        <br />
        <button
          to="/login"
          className="btn btn-info btn-md"
          style={{ margin: 20 }}
          onClick={e => this.redirectLogin(e)}
        >
          Login
        </button>
        <button
          className="btn btn-success btn-md"
          onClick={e => this.redirectRegister(e)}
        >
          Register
        </button>
      </div>
    );
  }
}

export default startPage;
