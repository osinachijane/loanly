import axios from "axios";
const url = process.env.REACT_APP_API_ENDPOINT;
/* eslint-disable import/no-anonymous-default-export */
export default {
  url,
  headers() {
    const token = localStorage.token;

    let header = {};
    if (token && token !== undefined) {
      header["Authorization"] = `Bearer ${token}`;
    }

    return header;
  },

  login(data) {
    return axios({
      method: "post",
      url: `${this.url}/users/login`,
      headers: this.headers(),
      data,
    });
  },
  register(data) {
    return axios({
      method: "post",
      url: `${this.url}/users/register`,
      headers: this.headers(),
      data,
    });
  },
  getProfile() {
    return axios({
      method: "get",
      url: `${this.url}/users/profile`,
      headers: this.headers(),
    });
  },
  postTransaction(data) {
    return axios({
      method: "post",
      url: `${this.url}/transactions/create`,
      headers: this.headers(),
      data,
    });
  },
};