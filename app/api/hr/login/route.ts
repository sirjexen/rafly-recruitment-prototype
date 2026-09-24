import {NextResponse} from "next/server";
import {authClient,adminClient} from "@/lib/supabase";
import {z} from "zod";
const Schema=z.object({email:z.string().email(),password:z.string().min(1)});
export async function POST(req:Request){
  try{
    const body=Schema.parse(await req.json());
    const auth=authClient();
    const {data,error}=await auth.auth.signInWithPassword(body);
    if(error||!data.session||!data.user){
      console.error("Supabase signInWithPassword failed:", error?.message || "missing session/user");
      return NextResponse.json({error:error?.message||"Supabase login gagal."},{status:401});
    }
    const admin=adminClient();
    const {data:profile,error:profileError}=await admin.from("hr_profiles").select("user_id").eq("user_id",data.user.id).maybeSingle();
    if(profileError){
      console.error("HR profile lookup failed:",profileError.message);
      return NextResponse.json({error:"Login berhasil, tetapi profil HR tidak dapat diverifikasi."},{status:500});
    }
    if(!profile)return NextResponse.json({error:"Akun ini tidak memiliki akses HR."},{status:403});
    const res=NextResponse.json({ok:true});
    res.cookies.set("hr_access_token",data.session.access_token,{httpOnly:true,secure:true,sameSite:"lax",path:"/",maxAge:60*60*8});
    return res;
  }catch(e){
    console.error("HR login route failed:",e);
    return NextResponse.json({error:"Login belum dapat diproses."},{status:400});
  }
}
