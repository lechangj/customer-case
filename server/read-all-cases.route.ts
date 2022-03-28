
import {db} from "./database";
import {Request, Response} from 'express';

export function readAllCases(req: Request, res: Response) {

    res.status(200).json({cases:db.readAllCases()});

}