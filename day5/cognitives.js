'use strict';

let axios = require('axios');
let config = require('./config')

const key_var = 'TEXT_ANALYTICS_SUBSCRIPTION_KEY';
if (!process.env[key_var] && !config[key_var]) {
    throw new Error('please set/export the following environment variable: ' + key_var);
}
const subscription_key = process.env[key_var] || config[key_var];

const endpoint_var = 'TEXT_ANALYTICS_ENDPOINT';
if (!process.env[endpoint_var] && !config[endpoint_var]) {
    throw new Error('please set/export the following environment variable: ' + endpoint_var);
}
const endpoint = process.env[endpoint_var] || config[endpoint_var];

let pathForLanguages = '/v2.1/languages';
let pathForSentiments = '/v2.1/sentiment';

let get_language = async function (documents) {
    let body = JSON.stringify(documents);
    let url = endpoint + pathForLanguages;
    let params = {
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': subscription_key
        }
    };
    let data = await axios.default.post(url, body, params)
    return data;
}

let get_sentiments = async function (documents) {
    let body = JSON.stringify(documents);
    let url = endpoint + pathForSentiments;
    let params = {
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': subscription_key
        }
    };
    let data = await axios.default.post(url, body, params)
    return data;
}

module.exports = {
    get_language,
    get_sentiments
}
