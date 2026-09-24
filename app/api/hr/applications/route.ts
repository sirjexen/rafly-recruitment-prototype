import {NextResponse} from "next/server";
import {requireHr} from "@/lib/auth";
import {adminClient} from "@/lib/supabase";
export const dynamic="force-dynamic";
export async function GET(){const hr=await requireHr();if(!hr)return NextResponse.json({error:"Unauthorized"},{status:401});const db=adminClient();const {data,error}=await db.from("applications").select("id,status,submitted_at,portfolio_url,applicant:applicants(full_name,email,phone),job:jobs(id,title)").order("submitted_at",{ascending:false}).limit(100);if(error){console.error(error);return NextResponse.json({error:"Gagal memuat kandidat."},{status:500})}return NextResponse.json({applications:data||[]},{headers:{"Cache-Control":"no-store"}})}
