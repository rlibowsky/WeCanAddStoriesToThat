/* Copyright G. Hemingway, @2017 */
'use strict';

let path            = require('path'),
    express         = require('express'),
    bodyParser      = require('body-parser'),
    logger          = require('morgan'),
    _               = require('underscore');

let port = process.env.PORT ? process.env.PORT : 3001;
let env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';

/**********************************************************************************************************/

// Setup our Express pipeline
let app = express();
if (env !== 'test') app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../../public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Import our routes
require('./routes')(app);

app.users = [
    {
        username: 'suzanneilyse',
        primary_email: 'suzanne@NHSMUN.ORG',
        password: '12345'
    },
    {
        username: 'danabaer',
        primary_email: 'dana@zona.ORG',
        password: '12345'
    },
    {
        username: 'ruth',
        primary_email: 'ruth@usc.ORG',
        password: '12345'
    },
    {
        username: 'phil',
        primary_email: 'phil@NHSMUN.ORG',
        password: '12345'
    },
    {
        username: 'isananaya',
        primary_email: 'isa@NHSMUN.ORG',
        password: '12345'
    },
    {
        username: 'jhumerick',
        primary_email: 'jhumerick@NHSMUN.ORG',
        password: '12345'
    },
    {
        username: 'barrygoldberg',
        primary_email: 'bgoldberg@NHSMUN.ORG',
        password: '12345'
    },
    {
        username: 'hallieruth',
        primary_email: 'hallieruth@sweetshotcookies.ORG',
        password: '12345'
    },
    {
        username: 'awlevin',
        primary_email: 'awlevin@NHSMUN.ORG',
        password: '12345'
    },
    {
        username: 'pitapan',
        primary_email: 'pitapan@tumblr.com',
        password: '12345'
    }
]

/**********************************************************************************************************/

// Run the server itself
let server = app.listen(port, () => {
    console.log('Example app listening on ' + server.address().port);
});