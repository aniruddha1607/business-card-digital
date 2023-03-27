import { createContext, useEffect, useState } from "react";

export const authContext = createContext({
    uid : '',
    token : '',
    isAuthenticated : false,
    isPremium : null,
    authenticate: () => {},
    logout: () => {},
    premium: () => {}

});

function AuthContextProvider({children}) {

    const[authToken, setAuthToken] = useState();
    const[userId, setUserId] = useState();
    const[isPremium, setIsPremium] = useState(null);

    function authenticate(token, recievedUserId) {
        setAuthToken(token);
        setUserId(recievedUserId)
    }

    function logout() {
        setAuthToken(null);
        setUserId(null)
        setIsPremium(null)
    }

    function premium() {
        setIsPremium(true);
    }

    const value = {
        uid : userId,
        token : authToken,
        isAuthenticated : !!authToken,
        isPremium : isPremium,
        authenticate : authenticate,
        logout : logout,
        premium : premium
    }

    return <authContext.Provider value={value}>{children}</authContext.Provider>
}

export default AuthContextProvider;