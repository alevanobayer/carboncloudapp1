import React from "react";
import axios from "axios";

let token = "";

export const GET_REQUEST = async (endPointName) => {
  token = window.localStorage.getItem('jwt');
  let response = [];
  axios.defaults.baseURL = 'https://backend-carboncloud.emea-dev.int.bayer.com/api';
  await axios({
    url: `/${endPointName}`,
    method: "GET",
    headers: {
      // TODO Add  auth token here
      //authorization: "your token comes here",
      "Content-Type": "text/plain",
      'Authorization': `Bearer ${token}`
    },
    // Attaching the form data
    // data: formData,
  })
    // Handle the response from backend here
    .then((res) => { response = res.data })
    // Catch errors if any
    .catch((err) => { });
  return response;
}

export const POST_REQUEST = async (endPointName, formData) => {
  let response = [];
  token = window.localStorage.getItem('jwt');
  axios.defaults.baseURL = 'https://backend-carboncloud.emea-dev.int.bayer.com/api';
  await axios({
    url: `/${endPointName}`,
    method: "POST",
    headers: {
      // TODO Add  auth token here
      //authorization: "your token comes here",
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
    // Attaching the form data
    data: formData,
    timeout: 30000,
  })
    // Handle the response from backend here
    .then((res) => { response = res.data;
    
      console.log("abc",res)
     })
    // Catch errors if any
  
    .catch((err) => {
      if(endPointName==="cool-farm-tool-batch") {
        response = err}
        else{
          response = err.response.data  
        };
    });
  return response;
}
export const DELETE_REQUEST = async (endPointName, parameterData) => {
  let response = [];
  token = window.localStorage.getItem('jwt');
  axios.defaults.baseURL = 'https://backend-carboncloud.emea-dev.int.bayer.com/api';
  await axios({
    url: `/${endPointName}/${parameterData}`,
    method: "DELETE",
    headers: {
      // TODO Add  auth token here
      //authorization: "your token comes here",
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
  })
    // Handle the response from backend here
    .then((res) => { response = res.data })
    // Catch errors if any
    .catch((err) => {
      response = err.response.data;
    });
  return response;
}
export const PUT_REQUEST = async (endPointName, parameterData) => {
  let response = [];
  token = window.localStorage.getItem('jwt');
  axios.defaults.baseURL = 'https://backend-carboncloud.emea-dev.int.bayer.com/api';
  await axios({
    url: `/${endPointName}/${parameterData}`,
    method: "PUT",
    headers: {
      // TODO Add  auth token here
      //authorization: "your token comes here",
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },

  })
    // Handle the response from backend here
    .then((res) => { response = res.data })
    // Catch errors if any
    .catch((err) => {
      response = err.response.data;
    });
  return response;
}