import { create , type StateCreator} from "zustand";
import { createJSONStorage, persist, type PersistOptions } from "zustand/middleware";
import { Register } from "@/app/auth/register/page";

export type Login = {
    email: string,
    password: string
}

type AuthStoreTypes = {
    userlogin: (a: Login) => any
    authMiddleware: () => any,
    authenticated: boolean
    registerFunction: (registerData: Register) => any
    data: any,
    error: boolean
    loading: boolean
    hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void;
}

// Escape hatch: assert persist's shape explicitly instead of relying on
// generic inference through the middleware chain, which zustand v5's
// persist sometimes fails to resolve correctly.
type PersistAuth = (
    config: StateCreator<AuthStoreTypes>,
    options: PersistOptions<AuthStoreTypes, Partial<AuthStoreTypes>>
) => StateCreator<AuthStoreTypes>

export const useAuthStore = create<AuthStoreTypes>()(
    (persist as PersistAuth)(
        (set:any) => ({
            data: [],
            hasHydrated: false,
            setHasHydrated: (state:any) => set({ hasHydrated: state }),
            authenticated: false,
            error: false,
            loading: false,
            userlogin: async (loginData:Login) => {
                try {
                    set({ loading: true, error: false })
                    let response = await fetch('http://localhost:8000/login', {
                        method: 'POST',
                        credentials: 'include',
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify(loginData)
                    })
                    let data = await response.json()
                    if (data.success) {
                        set({ data, authenticated: true, loading: false, error: false })
                    } else {
                        throw new Error(data.message)
                    }
                } catch (err: any) {
                    console.log(err.message)
                    set({ error: true, authenticated: false, loading: false })
                }
            },
            registerFunction: async (data:any) => {
                if (data.email && data.username && data.password) {
                    set({ error: false, loading: true })
                    try {
                        let response = await fetch('http://localhost:8000/register', {
                            method: 'POST',
                            headers: { 'Content-type': 'application/json' },
                            body: JSON.stringify(data)
                        })
                        let userdata = await response.json()
                        if (userdata.success) {
                            set({ loading: false })
                            return userdata
                        }
                    } catch (err: any) {
                        console.log(err.message)
                    } finally {
                        set({ loading: false })
                    }
                } else {
                    set({ error: true })
                }
            },
            authMiddleware: async () => {
                try {
                    let response = await fetch('http://localhost:8000/authmiddleware', {
                        credentials: 'include',
                    })
                    let data = await response.json()
                    console.log(data)
                } catch (error: any) {
                    console.log(error.message)
                }
            }
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                data: state.data,
                authenticated: state.authenticated,
            }),
            skipHydration: true
        }
    )
)