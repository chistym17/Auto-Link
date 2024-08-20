import React from 'react';
import { redirect } from 'next/navigation';
import getUserInfo from '../lib/actions/getuserinfo'; // Adjust the path as needed

const withPrivateRoute = (WrappedComponent) => {
    const Wrapper = async (props) => {
        const userInfo = await getUserInfo();

        if (!userInfo.userId) {
            redirect('/signup'); // Redirect to the signup page
            return null; // Return nothing while redirecting
        }

        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default withPrivateRoute;
