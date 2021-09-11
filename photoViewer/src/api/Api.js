import axios from "axios";

const jsonHolderURL = "https://jsonplaceholder.typicode.com";

// custom post api
export const postData = (url, data, config = {}) =>
  axios
    .post(`${jsonHolderURL}${url}`, data, config)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

// custom get api
export const getData = (url, params) =>
  axios
    .get(`${jsonHolderURL}${url}`, { params })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });


