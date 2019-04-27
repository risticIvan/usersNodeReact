import React from "react";
import axios from "axios";

class Show extends React.Component {
  constructor() {
    super();
    this.state = {
      data: "Initial"
    };
  }
  ShowFromServer(e) {
    axios.get("http://localhost:9000/hello").then(res => {
      this.setState({ data: res.data });
    });
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <br />
        <h2 style={{ color: "#b3b3cc" }}>Successful login and redirect</h2>
        <br />
        <button
          onClick={e => this.ShowFromServer(e)}
          className="btn btn-info btn-bg"
        >
          Show Cookie Id
        </button>
        <br />
        <br />
        <h3 style={{ color: "#b3b3cc" }}>{this.state.data}</h3>
      </div>
    );
  }
}

export default Show;
