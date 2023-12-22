/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const token = (localStorage.getItem('lluMeMallLoginToken'));
        if (token) {
            fetch(`https://glorious-boa-earrings.cyclic.app/api/v1/getMe`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success == false) {
                        setUser(null);
                        setUserName(null);
                    } else {
                        setUser(data.email);
                        setUserName(data.userName);
                        setUserRole(data.userRole);
                    }
                })
        } else {
            setUser(null);
        }
    }, [])
    // console.log(user, userName, userRole);

    const info = {
        user,
        userName,
        userRole,
    }
    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;