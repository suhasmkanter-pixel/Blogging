'use client'

import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import { useEffect } from "react"




export default function Home(){
  
  const router = useRouter()
  const state  =   useAuthStore(state=>state)
 


  useEffect(()=>{
    
    async function authmiddlewares(){
    
    }
    authmiddlewares()
  },[])

return (

<div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navbar Container */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Left Side: Logo/Title */}
          <div 
            className="flex cursor-pointer items-center space-x-2"
            onClick={() => router.push('/')}
          >
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-lg">
              B
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              DevBlog
            </span>
          </div>

          {/* Right Side: Actions & Profile */}
          <div className="flex items-center space-x-4">
            {/* Create Post Button */}
            <button 
              onClick={() => router.push('/create-post')}
              className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <svg 
                className="-ml-1 mr-1.5 h-4 w-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth="2" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Create
            </button>

            {/* Right-most Round Column / User Avatar */}
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-slate-200 bg-slate-100 shadow-inner flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-indigo-500/20 transition-all">
              {state.user?.avatarUrl ? (
                <img 
                  src={state.user.avatarUrl} 
                  alt="User profile" 
                  className="h-full w-full object-cover"
                />
              ) : (
                // Fallback avatar icon using SVG
                <svg 
                  className="h-6 w-6 text-slate-400" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </div>
          </div>

        </div>
      </nav>

      {/* Main Content Body */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Welcome Back
          </h1>
          <p className="mt-3 text-lg text-slate-500">
            Discover new perspectives, design patterns, and programming insights.
          </p>
        </div>

        {/* Post Grid Placeholder */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* You can map over your posts inside here later */}
        </div>
      </main>
    </div>
)

}