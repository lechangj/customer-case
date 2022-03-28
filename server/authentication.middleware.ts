import {Request, Response, NextFunction} from 'express';


export function checkIfAuthenticated(req: Request, res: Response, next: NextFunction) {

    if (req['user']) {
        // console.log("user exist");
        next();
    }
    else {
        // console.log("user does not exist");
        res.sendStatus(403);
    }


}


