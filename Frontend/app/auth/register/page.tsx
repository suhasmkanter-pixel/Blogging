'use client'
import { useAuthStore } from "@/store/authStore"
import { useEffect, useState } from "react"

import { useRouter } from "next/navigation"

export type Register = {
  username: string,
  password: string,
  email: string,
}

export default function Register() {
  const navigate = useRouter()
  const [register, Setregister] = useState<Register>(
    {
      username: '',
      password: "",
      email: ""
    }
  )
  let { registerFunction, error, loading,data } = useAuthStore(state => state)

  async function handleSubmit() {


    const data = await registerFunction(register)

    if (data.success) {
      navigate.push('/login')
    }
  }

  useEffect(()=>{
      console.log(data)
    if(data && data.authenticated){
      navigate.push("/")
    }

  },[])
  return (
    <div>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" placeholder="enter You username" onChange={(e) => Setregister({
          ...register,
          [e.target.name]: e.target.value
        })} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" placeholder="enter You Email" onChange={(e) => Setregister({
          ...register,
          [e.target.name]: e.target.value
        })} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input required={true} type="text" id="password" name="password" placeholder="enter You password" onChange={(e) => Setregister({
          ...register,
          [e.target.name]: e.target.value
        })} />
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {error ? <div>
        <h1>Sorry some values are missing </h1>
      </div> : ""}
    </div>
  )
}