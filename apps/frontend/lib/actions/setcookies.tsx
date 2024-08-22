'use server'

import { cookies } from 'next/headers'

async function create(token) {
  cookies().set({
    name: 'token',             
    value: token,              
    httpOnly: true,           
    path: '/',                
    maxAge: 60 * 60 ,  
  })
}

export default create;
