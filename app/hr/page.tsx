import {redirect} from "next/navigation";
import {requireHr} from "@/lib/auth";
import HrDashboard from "@/components/HrDashboard";
export const dynamic="force-dynamic";
export default async function HrPage(){const hr=await requireHr();if(!hr)redirect("/hr/login");return <HrDashboard displayName={hr.profile.display_name||"HR Demo"}/>}
