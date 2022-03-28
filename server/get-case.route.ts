

import {Request, Response} from "express";
import {db} from "./database";

export function getCase(req:Request, res:Response) {

    const id = req.params['id'];
    console.log(id);

    if (id) {

        const result = db.findCaseById(id);
        res.status(200).json({...result});
    }
    else {
        res.sendStatus(204);
    }
}