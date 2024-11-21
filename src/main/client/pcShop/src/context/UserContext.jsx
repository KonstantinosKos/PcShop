import React, {createContext, useEffect, useState} from 'react';

const UserContext = createContext(null);

export const UserProvider = ({children}) => {
    const getUser = JSON.parse(sessionStorage.getItem('user'));

    const [sessionUser, setSessionUser] = useState(
        getUser || {username: '', password: ''}
    );

    return (
        <UserContext.Provider value={{sessionUser, setSessionUser}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
