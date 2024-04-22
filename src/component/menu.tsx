import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaFilm } from "react-icons/fa";
import { GoPeople } from "react-icons/go";
import Chat from "./chat";
import { useCaracterStore } from "@/store/caracter";


export default function MenuPrincipal({
    children,
  }: {
    children: React.ReactNode
  }) {

    const { caracter } = useCaracterStore()

    const router = useRouter();
    const isActive = (route: string) => router.pathname === route;

    return (
        <section style={{display: 'flex'}}>
            <section style={{display: 'flex', flexDirection: 'column', width: '12%', padding: '25px 15px', background: '#101119', borderRight: 'solid 1px #141421'}}>
              <Image width={100} height={15} src="/logo.svg" alt="Logo RPG Master"></Image> 

              <Link href={`/section`} style={{marginTop: '35px', fontSize: '12px', display: 'flex', gap: '10px',padding: '12px 10px', backgroundColor: isActive(`/section`) ? "#12131D" : "none", border: isActive(`/section`) ? "solid 1px #292943" : "none", borderRadius: '10px'}}><GoPeople/> Personagem</Link>
              <Link href={`/section/scene`} style={{marginTop: '15px', fontSize: '12px', display: 'flex', gap: '10px',padding: '12px 10px', backgroundColor: isActive(`/section/scene`) ? "#12131D" : "none", border: isActive(`/section/scene`) ? "solid 1px #292943" : "none", borderRadius: '10px'}}><FaFilm/> Cenas</Link>
            
            </section>
            {children}
            {caracter[0] !== undefined && <Chat></Chat>}
        </section>
    )
  }