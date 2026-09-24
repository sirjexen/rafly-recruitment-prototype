import {NextResponse} from "next/server";
import {adminClient} from "@/lib/supabase";
export const dynamic="force-dynamic";
export async function GET(){try{const supabase=adminClient();const {data,error}=await supabase.from("jobs").select("id,title").eq("is_active",true).order("title");if(error)throw error;return NextResponse.json({jobs:data||[]},{headers:{"Cache-Control":"no-store"}})}catch(e){console.error("public jobs",e);return NextResponse.json({error:"Daftar lowongan belum dapat dimuat. Silakan coba lagi."},{status:503})}}
