import Link from "next/link";
import HrLoginForm from "@/components/HrLoginForm";
export default function Login(){return <main className="login-wrap"><section className="card login-card"><div className="brand"><div className="logo">R</div><div><strong>Rafly Recruitment</strong><small>HR secure area</small></div></div><h2 style={{marginTop:26}}>Login HR</h2><p className="sub">Gunakan akun HR demo yang sudah dibuat di Supabase Authentication.</p><HrLoginForm/><div style={{marginTop:18}}><Link className="link" href="/">← Kembali ke portal pelamar</Link></div></section></main>}
