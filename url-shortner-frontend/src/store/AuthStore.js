    import {create} from 'zustand'
    import { persist } from 'zustand/middleware';

    const useAuthStore = create(
        persist(
            (set , get)=>({
        email: null,
        token: null,
        isAuth: false,

        login:({email, token})=>set({
            email:email,
            token:token,
            isAuth:true,
        }),
        logout:()=>set({
            email:null,
            token:null,
            isAuth: false,
        }),
        checkLogin:()=>{
            const {email , token , isAuth} = get();
            return Boolean(email && token && isAuth);
        },

    }),
    {
        name: "auth-url-storage", // localStorage key
        partialize: (state) => ({
            email: state.email,
            token: state.token,
            isAuth: state.isAuth,
        }),
    }
    ));

    export default useAuthStore;