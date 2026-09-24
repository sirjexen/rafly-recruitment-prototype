import {NextResponse} from "next/server";
import {requireHr} from "@/lib/auth";
import {adminClient} from "@/lib/supabase";
import {STATUSES} from "@/lib/types";
export async function PATCH(req:Request,{params}:{params:Promise<{id:string}>}){const hr=await requireHr();if(!hr)return NextResponse.json({error:"Unauthorized"},{status:401});const {id}=await params;const {status}=await req.json();if(!STATUSES.includes(status))return NextResponse.json({error:"Status tidak valid"},{status:400});const db=adminClient();const {error}=await db.from("applications").update({status}).eq("id",id);if(error){console.error(error);return NextResponse.json({error:"Status gagal diperbarui"},{status:500})}return NextResponse.json({ok:true})}
