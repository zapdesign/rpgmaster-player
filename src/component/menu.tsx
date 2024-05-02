import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaFilm } from "react-icons/fa";
import { GoPeople } from "react-icons/go";
import Chat from "./chat";
import { useCaracterStore } from "@/store/caracter";
import { MdLogout } from "react-icons/md";
//@ts-ignore
import cookieCutter from 'cookie-cutter'; 

export default function MenuPrincipal({
    children,
  }: {
    children: React.ReactNode
  }) {

    const { caracter } = useCaracterStore()

    const router = useRouter();
    const isActive = (route: string) => router.pathname === route;

    const { pathname, push, replace } = useRouter();

    function setCookie(
        key: any,
        value: any,
        expireDays: any,
        expireHours: any,
        expireMinutes: any,
        expireSeconds: any
      ) {
        var expireDate = new Date();
        if (expireDays) {
          expireDate.setDate(expireDate.getDate() + expireDays);
        }
        if (expireHours) {
          expireDate.setHours(expireDate.getHours() + expireHours);
        }
        if (expireMinutes) {
          expireDate.setMinutes(expireDate.getMinutes() + expireMinutes);
        }
        if (expireSeconds) {
          expireDate.setSeconds(expireDate.getSeconds() + expireSeconds);
        }
        document.cookie =
          key +
          "=" +
          escape(value) +
          ";domain=" +
          window.location.hostname +
          ";path=/" +
          ";expires=" +
          expireDate.toUTCString();
      }
    
      function deleteCookie(name: any) {
        setCookie(name, "", null, null, null, 1);
      }
    
      const exit = async () => {
        cookieCutter.set("@access_token_player", "", {
          expires: new Date(-1),
        });
        deleteCookie("@access_token_player");
        replace("/");
      };

    return (
        <section style={{display: 'flex'}}>
            <section style={{display: 'flex', flexDirection: 'column', width: '12%', padding: '25px 15px', background: '#101119', borderRight: 'solid 1px #141421'}}>
              <Image width={100} height={15} src="/logo.svg" alt="Logo RPG Master"></Image> 

              <Link href={`/section`} style={{marginTop: '35px', fontSize: '12px', display: 'flex', gap: '10px',padding: '12px 10px', backgroundColor: isActive(`/section`) ? "#12131D" : "none", border: isActive(`/section`) ? "solid 1px #292943" : "none", borderRadius: '10px'}}><GoPeople/> Personagem</Link>
              <Link href={`/section/images`} style={{marginTop: '15px', fontSize: '12px', display: 'flex', gap: '10px',padding: '12px 10px', backgroundColor: isActive(`/section/images`) ? "#12131D" : "none", border: isActive(`/section/images`) ? "solid 1px #292943" : "none", borderRadius: '10px'}}><FaFilm/> Imagens</Link>
            
              <div style={{marginTop: '450px', fontSize: '12px', display: 'flex', gap: '10px',padding: '12px 10px', color:" red", cursor: "pointer"}} onClick={exit}><MdLogout /> Deslogar</div>
            </section>
            {children}
            {caracter[0] !== undefined && <Chat></Chat>}
        </section>
    )
  }