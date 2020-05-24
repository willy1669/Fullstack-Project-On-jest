/**

* @jest-environment node

*/


import User from '@models/User';

import mongoose from 'mongoose';

import Bycrypt from 'bcryptjs';

describe('The User model', () => {

    beforeAll( async () => {

        await mongoose.connect('mongodb://localhost:27017/auth-app_test', { useNewUrlParser: true, useUnifiedTopology: true  });

    })

    it('should hash the password before saving to the database', async () => {

        const user = {
            name: 'Test User',

            email: 'test@user.com',

            password: 'password'
        }
        
        const createdUser = await   User.create(user);

        expect(Bycrypt.compareSync(user.password, createdUser.password)).toBe(true);

    });

    it('should set the email confirm code for the user before saving to database', async () => {

        const user = {
            name: 'Test User',

            email: 'test@user.com',

            password: 'password'
        }
        
        const createdUser = await   User.create(user);

        expect(createdUser.emailConfirmCode).toEqual(expect.any(String))

    })
    
    afterAll( async () => {
        
        await mongoose.connection.close()
    
    })

        
    
})