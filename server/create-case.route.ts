import { ICase } from "../src/app/model";
import {db} from "./database";
import {Request, Response} from 'express';


export function createCase(req: Request, res:Response) {

    const caseInstance = <ICase>req.body;

    const newCase = db.createCase(caseInstance);
    res.status(200).json({...newCase});

}