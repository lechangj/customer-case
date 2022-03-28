
import express = require('express');
// import * as express from 'express';
import {Application} from "express";
import {readAllCases} from "./read-all-cases.route";
import {createCase} from "./create-case.route";
import {getUser} from "./get-user.route";
import {getCase} from "./get-case.route";
import {logout} from "./logout.route";
import {login} from "./login.route";
import {retrieveUserIdFromRequest} from "./get-user.middleware";
import {checkIfAuthenticated} from "./authentication.middleware";
import {checkIfAuthorized} from "./authorization.middleware";
import * as _ from 'lodash';
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const app: Application = express();
const portNo = 9000;

app.use(cookieParser());
app.use(retrieveUserIdFromRequest);
app.use(bodyParser.json());


// REST API
app.route('/api/cases')
    .get(checkIfAuthenticated,
        _.partial(checkIfAuthorized,['USER']),
        readAllCases);

app.route('/api/case/:id')
    .get(checkIfAuthenticated,
        _.partial(checkIfAuthorized,['USER']),
        getCase);

app.route('/api/case')
    .post(checkIfAuthenticated,
        _.partial(checkIfAuthorized,['ADMIN']),
        createCase);

app.route('/api/user')
    .get(getUser);

app.route('/api/logout')
    .post(checkIfAuthenticated, logout);

app.route('/api/login')
    .post(login);


// launch an HTTP Server
const httpServer = app.listen(portNo, () => {
    console.log(`Server is now running on port ${portNo} ...`);
});








