import {NextResponse} from "next/server";
import {requireHr} from "@/lib/auth";
import {adminClient} from "@/lib/supabase";
export async function PATCH(req:Request,{params}:{params:Promise<{id:string}>}){const hr=await requireHr();if(!hr)return NextResponse.json({error:"Unauthorized"},{status:401});const {id}=await params;const body=await req.json();if(typeof body.is_active!=="boolean")return NextResponse.json({error:"Data tidak valid"},{status:400});const db=adminClient();const {error}=await db.from("jobs").update({is_active:body.is_active}).eq("id",id);if(error)return NextResponse.json({error:"Lowongan gagal diperbarui"},{status:500});return NextResponse.json({ok:true})}
