import React from 'react';
import { redirect } from 'next/navigation';
import getUserInfo from '../lib/actions/getuserinfo'; 

const withPrivateRoute = (WrappedComponent) => {
    const Wrapper = async (props) => {
        const userInfo = await getUserInfo();

        if (!userInfo.userId) {
            redirect('/signup'); 
            return null; 
        }

        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default withPrivateRoute;
