
import * as _ from 'lodash';
import { ICase } from '../src/app/model';
import {CASES, USERS} from "./database-data";
import {DbUser} from "./db-user";


class InMemoryDatabase {

    caseCounter = 9;

    readAllCases() {
        return _.values(CASES);
    }

    findCaseById(id:string) :ICase {

        console.log(`Id:  ${id}`);

        let caseInstance: ICase = {
            id: 0,
            type:'',
            agent: '',
            createdAt:'',
            description:'',
            allocatedTo:'',
            action:'',
            respondedAt:'',
            status:'',
            feedback:''
        };

        if (id) {

            const cases = _.values(CASES);

            let result = _.find(cases, c => c.id.toString() === id);

            if(result) {
                caseInstance = result;    
                console.log("case data found:", caseInstance);
            }
        }

        return caseInstance;

    }

    createCase(caseInstance: ICase) {        

        if(caseInstance.id) {
    
            const existingCase: ICase = {
                ...caseInstance
            };

            CASES[caseInstance.id] = existingCase;

            console.log(CASES);
    
            return existingCase;

        } else {

            this.caseCounter++;
    
            const id = this.caseCounter;
    
            const newCase: ICase = {
                ...caseInstance,
                id: id,
            };

            CASES[id] = newCase;

            console.log(CASES);
    
            return newCase;

        }
    }

    findUserByEmail(email:string) :DbUser{

        let user: DbUser = {
            id: 0,
            email: '',
            passwordDigest: '',
            roles: []
        };

        console.log("Finding user by email:", email);

        const users = _.values(USERS);

        const result = _.find(users, user => user.email === email);

        if(result)
            user = result;

        console.log("user retrieved:", user);

        return user;
    }

    findUserById(userId:string) :DbUser {

        let user: DbUser = {
            id: 0,
            email: '',
            passwordDigest: '',
            roles: []
        };

        if (userId) {

            console.log("looking for userId ", userId);

            const users = _.values(USERS);

            let result = _.find(users, user => user.id.toString() === userId);

            if(result)
                user = result;

            console.log("user data found:", user);
        }

        return user;

    }

}




export const db = new InMemoryDatabase();


