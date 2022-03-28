


import {decodeJwt} from "./security.utils";
import {Request, Response, NextFunction} from 'express';


export function retrieveUserIdFromRequest(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);

    if (token) {
        handleSessionCookie(token, req)
            .then(() => next())
            .catch(err => {
                console.error(err);
                next();
        })
    }
    else {
      next();
    }
}



async function handleSessionCookie(jwt:string, req: Request) {
    try {

        const payload = await decodeJwt(jwt);

        req["user"] = payload;

    }
    catch(err) {
        if (err instanceof Error) {
            console.log("Error: Could not extract user from request:", err.message);
        }
    }
}






