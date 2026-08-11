import { createClient } from '@supabase/supabase-js'
import {configDotenv} from 'dotenv'
configDotenv()

export const supabase =  createClient(
    process.env.PROJECT_URL ??"",
    process.env.SERVICE_ROLE??"" 
)
