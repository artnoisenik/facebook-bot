'use strict';

require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const request = require('request');
const axios = require('axios');

const OPEN_WEATHER_TOKEN = process.env.OPEN_WEATHER_TOKEN;

// let info;

const apiCall = (location) => {
return axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${OPEN_WEATHER_TOKEN}`).then((res) => {
  // console.log('res from axios', res.data);
  return res.data;
})
//   request({
//   uri: 'http://api.openweathermap.org/data/2.5/weather',
//   method: 'GET',
//   encoding: 'utf-8',
//   json: true,
//   qs: { q: location, appid: OPEN_WEATHER_TOKEN},
//   headers: {'Content-Type': 'application/json'},
// })
// .then((res) => {
//   console.log('res!', res);
// })
// .on('data', function (data) {
//     let stuff = JSON.parse(data);
//     console.log('happened', data);
//     body = stuff;
//     return stuff;
//   }).then((res) => {
//     console.log('res in then after on', res);
//   })

}

apiCall('tokyo').then((result) => {

  console.log(result);
});
