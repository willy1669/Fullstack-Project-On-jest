import User from '@models/User';

import mongoose from 'mongoose';

import Bycrypt from 'bcryptjs';

describe('The User model', () => {

    it('should hash the password before saving to the database', async () => {

        await mongoose.connect('mongodb://localhost:27017/auth-app_test');

        const user = {
            name: 'Test User',

            email: 'test@user.com',

            password: 'password'
        }


        const createdUser = await   User.create(user);

        expect(Bycrypt.compareSync(user.password, createdUser.password)).toBe(true)
    })
})