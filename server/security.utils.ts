



import * as moment from 'moment'
const util = require('util');
const crypto = require('crypto');
import * as jwt from 'jsonwebtoken';
import * as fs from "fs";
import * as argon2 from 'argon2';
import {DbUser} from "./db-user";


export const randomBytes = util.promisify(crypto.randomBytes);

export const signJwt = util.promisify(jwt.sign);


const RSA_PRIVATE_KEY = fs.readFileSync('./private.key');

const RSA_PUBLIC_KEY = fs.readFileSync('./public.key');

const SESSION_DURATION = 1000;


export async function createSessionToken(user: DbUser) {
    return signJwt({
            roles: user.roles
        },
        RSA_PRIVATE_KEY, {
        algorithm: 'RS256',
        // expiresIn: 72000,
        subject: user.id.toString()
    });
}


export async function decodeJwt(token:string) {

    const payload = await jwt.verify(token, RSA_PUBLIC_KEY);

    console.log("decoded JWT payload", payload);

    return payload;
}

