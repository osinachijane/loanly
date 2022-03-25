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
  getUsers() {
    return axios({
      method: "get",
      url: `${this.url}/users`,
      headers: this.headers(),
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
  getTransactions(reference = "") {
    return axios({
      method: "get",
      url: `${this.url}/transactions/user?reference=${reference}&limit=5`,
      headers: this.headers(),
    });
  },
  postLoan(data) {
    return axios({
      method: "post",
      url: `${this.url}/loans/create`,
      headers: this.headers(),
      data,
    });
  },
  getLoans() {
    return axios({
      method: "get",
      url: `${this.url}/loans/user?limit=5`,
      headers: this.headers(),
    });
  },
  initiatePayment(data) {
    return axios({
      method: "post",
      url: `${this.url}/transactions/initiate-payment`,
      data,
    });
  },
};
