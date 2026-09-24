import {NextResponse} from "next/server";
import {requireHr} from "@/lib/auth";
import {adminClient} from "@/lib/supabase";
import {z} from "zod";
export const dynamic="force-dynamic";
export async function GET(){const hr=await requireHr();if(!hr)return NextResponse.json({error:"Unauthorized"},{status:401});const db=adminClient();const {data,error}=await db.from("jobs").select("id,title,description,is_active").order("created_at",{ascending:false});if(error)return NextResponse.json({error:"Gagal memuat lowongan"},{status:500});return NextResponse.json({jobs:data||[]},{headers:{"Cache-Control":"no-store"}})}
const Create=z.object({title:z.string().min(2).max(120),description:z.string().min(2).max(5000)});
export async function POST(req:Request){const hr=await requireHr();if(!hr)return NextResponse.json({error:"Unauthorized"},{status:401});try{const body=Create.parse(await req.json());const db=adminClient();const {data,error}=await db.from("jobs").insert({title:body.title.trim(),description:body.description.trim(),is_active:true}).select("id").single();if(error)throw error;return NextResponse.json({ok:true,id:data.id})}catch(e){console.error(e);return NextResponse.json({error:"Lowongan gagal dibuat"},{status:400})}}
