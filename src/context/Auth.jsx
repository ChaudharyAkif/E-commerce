import React, { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react'
import supabase from '../config/supabase';




const Auth = createContext();

const initialState = { isAuth: false, user: {} }

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "SET_LOGGED_IN": return { isAuth: true, user: payload.user }
        case "SET_PROFILE": return { ...state, user: { ...state.user, ...payload.user } }
        case "SET_LOGGED_OUT": return initialState;
    }
}

const AuthContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [isAppLoading, setisAppLoading] = useState(true)

    const readUser = useCallback(async (user) => {
        let { data, error } = await supabase.from('users').select('').eq("uid", user.id).single()
        if (!error) {
            dispatch({ type: "SET_LOGGED_IN", payload: { user: data } })
        }
        else {
            console.log(error)
        }
        setisAppLoading(false)
    },[])
    const getData = useCallback(async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            readUser(user)
        }
        else {
            setisAppLoading(false)
        }
    },[])

    useEffect(() => { getData() }, [getData])

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
        if (!error) {
            dispatch({ type: "SET_LOGGED_OUT" })
        console.log("Assaduia")
        console.log(isAuth)
        }
        else {
            console.log(error)
        }
    }
    return (
        <Auth.Provider value={{ ...state, dispatch, readUser, handleLogout, isAppLoading }}>
            {children}
        </Auth.Provider>
    )
}


export const useAuthcontext = () => useContext(Auth)
export default AuthContext