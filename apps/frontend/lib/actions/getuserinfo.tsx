'use server';

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';

async function getUserInfo() {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    const secretKey = process.env.JWT_SECRET;

    if (!token) {
        redirect('/signup');
        return null; 
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded; 
    } catch (error) {
        console.error('Invalid token', error);
        redirect('/signup');
        return null; 
    }
}

export default getUserInfo;
