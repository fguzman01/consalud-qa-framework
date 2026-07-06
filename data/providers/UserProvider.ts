import { UsersData } from '../models/UserModel';
import * as fs from 'fs';
import * as path from 'path';

export class UserProvider {
    private data: UsersData;

    constructor() {
        const filePath = path.resolve(__dirname, '../json/users.json');
        this.data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }

    getValidUser() {
        return this.data.validUser;
    }

    getInvalidUser() {
        return this.data.invalidUser;
    }

    getEmpatyUser(){
        return this.data.empatyUser;
    }
}