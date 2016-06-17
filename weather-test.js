'use strict';

require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const request = require('request');

const OPEN_WEATHER_TOKEN = process.env.OPEN_WEATHER_TOKEN;

// let info;
const apiCall = (location) => request({
  uri: 'http://api.openweathermap.org/data/2.5/weather',
  method: 'GET',
  encoding: 'utf-8',
  json: true,
  qs: { q: location, appid: OPEN_WEATHER_TOKEN},
  headers: {'Content-Type': 'application/json'},
})
  .on('data', function (data) {
    let stuff = JSON.parse(data);
    console.log(stuff);
  })

apiCall('tokyo');
