import axios from "axios";

export const getList = () => {
  return axios
    .get("http://localhost:9000/getusers", {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {
      return res.data;
    });
};

export const deleteItem = id => {
  return axios
    .delete(`http://localhost:9000/user/${id}`, {
      headers: { "Content-Type": "application-json" }
    })
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });
};

export const updateItem = (username, password, id) => {
  var updData = {
    username: username,
    password: password
  };
  return axios.put(`http://localhost:9000/put/${id}`, updData);
};

export const addItem = data => {
  return axios.post("http://localhost:9000/register", data);
};
