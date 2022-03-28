import {DbUser} from "./db-user";

export const USERS: { [key: number]: DbUser } = {
    1: {
        id: 1,
        email: 'user@gmail.com',
        // ADMIN user password is Password10
        passwordDigest: '$argon2i$v=19$m=4096,t=3,p=1$vfrhde0OMBNSSE9rRWtVrQ$gBaNgJFPBZfzuvrzfX8iSr2+OCD8K8Iu/JjwpYp8/TY',
        roles: ['USER']
    },
    2: {
        id: 2,
        email: 'admin@gmail.com',
        // normal user password is Password10
        passwordDigest: '$argon2i$v=19$m=4096,t=3,p=1$vfrhde0OMBNSSE9rRWtVrQ$gBaNgJFPBZfzuvrzfX8iSr2+OCD8K8Iu/JjwpYp8/TY',
        roles: ['USER', 'ADMIN']
    }
};


export const CASES = {

    0: {
        id: 0,
        "type": "Billing",
        "agent": "019",
        "createdAt": "03/15/22 03:30:45",
        "description": "Address is changed",
        "allocatedTo": "Finance",
        "action": "Address is updated",
        "respondedAt": "03/15/22 05:30:45",
        "status": "Resolved",
        "feedback": "Good"
    },
    1: {
        id: 1,
        "type": "Billing",
        "agent": "020",
        "createdAt": "03/16/22 03:30:45",
        "description": "Inquiry about the bill number",
        "allocatedTo": "",
        "action": "",
        "respondedAt": "",
        "status": "Open",
        "feedback": ""
    },
    2: {
        id: 2,
        "type": "Billing",
        "agent": "023",
        "createdAt": "03/17/22 03:30:45",
        "description": "Inquiry about the payment",
        "allocatedTo": "Finance",
        "action": "",
        "respondedAt": "",
        "status": "Investigation",
        "feedback": ""
    },
    3: {
        id: 3,
        "type": "Fraud",
        "agent": "019",
        "createdAt": "03/15/22 04:30:45",
        "description": "Unknown payment is made",
        "allocatedTo": "Finance",
        "action": "",
        "respondedAt": "",
        "status": "Investigation",
        "feedback": ""
    },
    4: {
        id: 4,
        "type": "Complaint",
        "agent": "027",
        "createdAt": "03/18/22 10:30:41",
        "description": "Received goods are broken",
        "allocatedTo": "056",
        "action": "Resend the goods",
        "respondedAt": "03/17/22 02:20:05",
        "status": "Resolved",
        "feedback": "Good"
    },
    5: {
        id: 5,
        "type": "Billing",
        "agent": "019",
        "createdAt": "03/18/22 03:30:45",
        "description": "Inquiry about the amount",
        "allocatedTo": "Finance",
        "action": "Explained",
        "respondedAt": "03/20/22 05:30:45",
        "status": "Resolved",
        "feedback": "Good"
    },
    6: {
        id: 6,
        "type": "Complaint",
        "agent": "019",
        "createdAt": "03/15/22 03:30:45",
        "description": "Cannot login",
        "allocatedTo": "",
        "action": "",
        "respondedAt": "",
        "status": "Open",
        "feedback": ""
    },
    7: {
        id: 7,
        "type": "Complaint",
        "agent": "031",
        "createdAt": "03/17/22 13:10:45",
        "description": "Data is missing",
        "allocatedTo": "",
        "action": "",
        "respondedAt": "",
        "status": "Open",
        "feedback": ""
    },
    8: {
        id: 8,
        "type": "Billing",
        "agent": "019",
        "createdAt": "03/16/22 18:30:02",
        "description": "Amount inquiry",
        "allocatedTo": "",
        "action": "",
        "respondedAt": "",
        "status": "Open",
        "feedback": ""
    },
    9: {
        id: 9,
        "type": "Complaint",
        "agent": "021",
        "createdAt": "03/15/22 03:30:45",
        "description": "Update is too slow",
        "allocatedTo": "IT",
        "action": "",
        "respondedAt": "",
        "status": "Investigation",
        "feedback": ""
    }

};