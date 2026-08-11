import {configDotenv} from 'dotenv'
configDotenv()
import express   from "express";
import cors from 'cors'
import bcrypt from 'bcryptjs'
import { supabase } from './utlities/supbaseClient';
import jwt from 'jsonwebtoken'
import cookieParser  from 'cookie-parser'
const app = express()
app.use(express.json())
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))

app.use(cookieParser())



app.post("/register",async (req,res)=>{

    const {username,email,password } = req.body ; 


    if (!username || !email || !password){
        return res.status(404).json({
            message:"Some Fields are Missing",
            sucess:false
        })
    }

    try{
        const {data,error} =   await supabase.from("Users")
          .select("*")
          .eq("email",email)
          .limit(1)
        
        if (data  && data.length > 0  ){
            console.log(data,"Hello world bro ")
            return res.status(409).json({
                message:"THe user is already registered",
                success:false
            })
        }else{
         
        const hashedpassword =  await bcrypt.hash(password,10)
        

         const data =  await supabase.from('Users').insert(
              {username,email,password:hashedpassword}
            ).select().limit(1)
         
          return res.status(201).json({
            success:true,
            message:"The user is Successfully Created "
          })
        } 
        }catch(err:any){

            console.log(err.message)
            return res.status(504).json({
                success:false,
                message:"Something is Wrong "+ err.message
            })
        }



     

})



app.post("/login",async (req,res)=>{
    const {email,password } = req.body ; 


     console.log("Hello Bro ")
    if (!email || !password){
        return res.status(404).json({
            message:"Some Fields are Missing",
            sucess:false
        })
    }



    try{
    
        const {data,error} =   await supabase.from("Users")
          .select("*")
          .eq("email",email)
          .limit(1)

        console.log(data,"HEllo")
        if (data  && data.length > 0  ){

           const correct =  bcrypt.compare(password,data[0]?.password)   
           const token = jwt.sign({data:data[0],authenticated:true},'suhasmk@779')

           res.cookie('token',token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            maxAge : 3600000
           })
           if(!correct){
             return res.status(404).json({
                success:false,
                message:"The Password Credentials Are Wrong"
            })
           }
            return res.status(201).json({
                message:"THe user is Successfully Authenticated ",
                success:true,
                data:data
            })
        }else{
       
          return res.status(201).json({
            success:false,
            message:"The user is Not Registered  "
          })
        } 
        }catch(err:any){

            console.log(err.message)
            return res.status(504).json({
                success:false,
                message:"Something is Wrong "+ err.message
            })
        }



     

})


app.get("/authmiddleware",async(req,res)=>{ 
   
    console.log("Hello world    ")
    let {token} = req.cookies
    console.log(token)
    if (!token){
        return res.status(404).json({
            success:false,
            message:"The Token is missing "
        })
    } 

     
    





})


app.post('/post/create',async(req,res)=>{

     console.log(req.body)
    let {editorData,id,title,draft } = req.body 

   
    if (id && title && draft){

        const {data,error} = await supabase.from("posts").insert({
            user_id:id,
            posts:title+editorData,
            draft:draft
        }).select("*").limit(1)

         console.log(data)

    }
})


app.listen(process.env.PORT,(err)=>{
    if(err){
        console.log("Error Occured",err)
    }
    console.log(`Successfully runnng the thing:${process.env.PORT} `)
})