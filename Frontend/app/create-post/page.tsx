'use client'
import Tiptap from '@/components/tiptap'
import { useAuthStore } from '@/store/authStore'
import React, { useState } from 'react'

type PublishData = {
    title:string,
    editorData:string,
    id:string,
    email:string,
    username:string,
    draft:boolean
}
function CreatePost() {
    const [title,setTitle] = useState<string>('')
    const [draft,setDraft] = useState<boolean>(false)
    const[editor,setEditorChange] = useState<string>('')
    const {data} = useAuthStore(state=>state.data)
    

    async function onPublish(exportingData:PublishData){
        console.log(exportingData,"hello")

        try {
         let response:any = await fetch("http://localhost:8000/post/create",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(exportingData)
         })
         let data = await response.json() 
         console.log(data)
         
        }catch(error:any){
            console.log(error.message)
        }
    }
  return (
    <div>
        
     
     <input type="text" onChange={(e)=>setTitle(e.target.value)} />

        <Tiptap data={"Suhas"} setEditorChange={setEditorChange}/>


     <button onClick={()=>onPublish({
        title:title,
        editorData:editor,
        id:data[0].id , 
        email:data[0].email,
        username:data[0].username,
        draft:draft
     })} >
        Publish
        </button>    
        <div>

        </div>

        <button onClick={()=>onPublish({
            title:title,
            editorData:editor,
            id:data[0].id,
            email:data[0].email,
            username:data[0].username,
            draft:!draft
        })}>
            Save as Draft
        </button>
        
        </div>
  )
}

export default CreatePost