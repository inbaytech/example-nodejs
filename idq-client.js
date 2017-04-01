/*!
 * idq-client
 * Copyright(c) 2016 inBay Technologies Inc.
 * MIT Licensed
 */

'use strict';

/**
 * Module Dependencies
 * @private
 */

var request = require('request');
var querystring = require('querystring');

/**
 * Module Exports
 * @public
 */
module.exports.generateUUID = generateUUID;
module.exports.build_auth_url = build_auth_url;
module.exports.get_token = get_token;
module.exports.get_user = get_user;

// OAuth 2.0 Client Configuration
var client_id = 'YOUR_CLIENT_ID';
var client_secret = 'YOUR_CLIENT_SECRET';
var redirect_url = 'http://127.0.0.1:8123/oauthcallback';

// idQ TaaS Backend Configuration
var base_url= "https://beta.idquanta.com/idqoauth";
var ep_auth=  "/api/v1/auth";
var ep_pauth= "/api/v1/pauth";
var ep_preg=  "/api/v1/push";
var ep_token= "/api/v1/token";
var ep_user=  "/api/v1/user";


/**
 * Create a UUID
 */
function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxxxxxxZxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

/**
 * Builds a link to an idQ Authentication URL
 * using the configured OAuth 2.0 client credentials
 * and a given state.
 *
 * @param{state} req
 * @public
 */
function build_auth_url(state) {
    return base_url + ep_auth + "?" + querystring.stringify(
      {
        state: state,
        client_id: client_id,
        response_type: 'code',
        scope: 'optional',
        redirect_uri: redirect_url
      }
    );
}

/**
 * Exchanges an authorization code for an access token
 * using the configured OAuth 2.0 client credentials
 * and a given authorization_code. Will call the provided
 * callback function when REST request to idQ TaaS backend
 * is completed, passing in the backend response as JSON.
 *
 * @param{authorization_code} req
 * @param{callback} req
 * @public
 */
function get_token(authorization_code, callback) {
    // Assemble the URL for the Token Endpoint
    var token_url = base_url + ep_token;

    // Make an async POST request to the idQ TaaS backend
    request({
        url: token_url,
        method: 'POST',
        form: {
            client_id: client_id,
            client_secret: client_secret,
            code: authorization_code,
            redirect_uri: redirect_url,
            grant_type: 'authorization_code'
        }
    }, function(error, response, body) {
        if(error) {
            console.log(error);
        } else {
            var response_json = JSON.parse(body);
            callback(response_json);
        }
    });
}

/**
 * Exchanges an access token for an idQ user object
 * using the configured OAuth 2.0 client credentials
 * and a given access token. Will call the provided callback
 * function when the REST request to idQ TaaS backend
 * is completed, passing in the idQ user object as JSON.
 *
 * @param{token} req
 * @param{callback} req
 * @public
 */
function get_user(token, callback) {
    // Assemble the URL for the User endpoint
    var user_url = base_url + ep_user + "?access_token=" + token;

    // Make an async GET request to the idQ TaaS backend
    request(user_url, function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            var response_json = JSON.parse(body);
            callback(response_json);
        }
    });
}
