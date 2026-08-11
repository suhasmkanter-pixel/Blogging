'use client'
import { Login, useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export type userData = {
    message: string,
    success: boolean
}

export default function LoginPage() {
    const navigate = useRouter()
    const [loading, Setloading] = useState<boolean>()

    const { userlogin, data, authenticated ,hasHydrated} = useAuthStore(state => state)
    const [login, SetLogin] = useState<Login>({
        email: '',
        password: ''
    })
    async function handleLogin() {
        await userlogin(login)

    }


    useEffect(() => {
        Setloading(true)
        if (authenticated && data?.success) {
            navigate.push("/")
        }else{
            Setloading(false)
        }
    }, [authenticated, data,navigate])

       if (!hasHydrated) {
      return null; // or a loading spinner
}

   
    return (<div>
{
 
     loading?<div> <h1>Loading ....</h1></div> :      <div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Enter Your Email"
                    onChange={(e) => SetLogin({
                        ...login,
                        [e.target.name]: e.target.value
                    })}
                />
            </div>
            <div>

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Enter Your password" onChange={(e) => SetLogin({
                    ...login,
                    [e.target.name]: e.target.value
                })} />
            </div>
            <div>
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>

}
</div>
    )
}