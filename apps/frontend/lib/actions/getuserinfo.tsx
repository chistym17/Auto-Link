'use server';

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';

async function getUserInfo() {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    const secretKey = process.env.JWT_SECRET;

    if (!token) {
        // Redirect to signup page if no token is found
        redirect('/signup');
        return null; // Ensure function does not proceed further
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded; 
    } catch (error) {
        // Optionally log the error for debugging purposes
        console.error('Invalid token', error);
        // Redirect to signup page if token is invalid
        redirect('/signup');
        return null; // Ensure function does not proceed further
    }
}

export default getUserInfo;
