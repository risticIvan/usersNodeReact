import React from "react";
import { getList, deleteItem, addItem, updateItem } from "./listFunctions";

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      _id: "",
      username: "",
      password: "",
      editDisabled: false,
      items: []
    };
    // this.onSubmit = this.onSubmit.bind(this);
    // this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.getAll();
  }

  getAll = () => {
    getList().then(data => {
      this.setState(
        {
          _id: "",
          username: "",
          password: "",
          items: [...data]
        },
        () => {
          console.log(this.state.items);
        }
      );
    });
  };

  onDelete = (val, e) => {
    e.preventDefault();
    deleteItem(val).then(resault => {
      this.getAll();
    });

    var data = [...this.state.items];
    data.filter(function(item, index) {
      if (item[1] === val) {
        data.splice(index, 1);
      }
      return true;
    });
    this.setState({ items: [...data] });
  };

  onAdd = e => {
    e.preventDefault();
    let user = {
      username: this.state.username,
      password: this.state.password
    };
    addItem(user).then(() => {
      this.getAll();
    });
  };

  onUpdate = e => {
    e.preventDefault();
    updateItem(this.state.username, this.state.password, this.state._id).then(
      () => {
        this.getAll();
      }
    );
  };

  onEdit = (item, itemid, e) => {
    e.preventDefault();
    this.setState({
      _id: item,
      username: itemid.username,
      password: itemid.password
    });
  };

  handleChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div>
        <div
          className="container"
          style={{ textAlign: "center", width: "50%" }}
        >
          <br />
          <div style={{ textAlign: "center" }}>
            <label style={{ fontSize: 30, color: "#b3b3cc" }}>
              Add new user
            </label>
          </div>
          <br />
          <div style={{ textAlign: "center" }}>
            <input
              style={{ textAlign: "center" }}
              className="form-control"
              placeholder="Username"
              name="username"
              value={this.state.username || ""}
              onChange={e => this.handleChangeUsername(e)}
            />
          </div>

          <br />
          <input
            style={{ textAlign: "center" }}
            className="form-control"
            placeholder="Password"
            name="password"
            value={"" || this.state.password}
            onChange={e => this.handleChangePassword(e)}
          />
          <br />
          <div style={{ textAlign: "center" }}>
            <button
              style={{ marginRight: 20 }}
              onClick={e => this.onAdd(e)}
              className="btn btn-success btn-md"
            >
              Submit
            </button>
            <button
              onClick={e => this.onUpdate(e)}
              className="btn btn-success btn-md"
            >
              Update
            </button>
          </div>
        </div>
        <br />
        <div style={{ textAlign: "center" }}>
          <label style={{ fontSize: 30, color: "#b3b3cc" }}>
            List of registred users
          </label>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Username</th>
              <th scope="col">Password</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.items.map((item, index) => (
              <tr key={index}>
                <td>{item._id}</td>
                <td>{item.username}</td>
                <td>{item.password}</td>
                <td>
                  <button
                    href=""
                    className="btn btn-info mr-1"
                    disabled={this.state.editDisabled}
                    onClick={this.onEdit.bind(item, item._id, item)}
                    // onClick={this.onEdit.bind(item => this.onEdit(item))}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    href=""
                    className="btn btn-danger"
                    onClick={this.onDelete.bind(this, item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default List;
