'use server';

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

async function getUserInfo() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value; 
  console.log(token)
  const secretKey = process.env.JWT_SECRET;
  console.log(secretKey)

  if (!token) {
    throw new Error('Token not found');
  }

  try {
    const secretKey = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secretKey); 
    console.log(secretKey)
    return decoded; 
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export default getUserInfo;
