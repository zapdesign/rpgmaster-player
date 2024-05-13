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
import { useUsersStore } from "@/store/users/Index";
import ImagesMaster from "@/component/images";
import { useEffect, useState } from "react";
import ImageActive from "./imagesComp/active";
import { URL } from '@/services/baseURL';
import { io } from 'socket.io-client';
import { token } from '@/services/takeToken';
import { axiosInstance } from "@/services/axiosInstance";

const socket = io(URL, {
  auth: {
      token: token
  }
})

interface Payload {
  id?: string
  text: string
  project_id: string
}


export default function MenuPrincipal({
    children,
  }: {
    children: React.ReactNode
  }) {

    const { users } = useUsersStore()
    const { caracter } = useCaracterStore()

    const router = useRouter();
    const isActive = (route: string) => router.pathname === route;

    const [ image, setImage ] = useState(false)

    const { pathname, push, replace } = useRouter();

    const [ modalImagem, setModalImagem ] = useState(false)
    const [ imagemGrande, setImagemGrande ] = useState("")

    const [ actualImagem, setActualImage ] = useState('')

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

    const getImage = async (image: string) => {
      if(image === "") {
          setActualImage("")
          return
      }
      try{
          const response = await axiosInstance(`upload/get/${image}`)
          const data = await response.data
          setActualImage(data)
          setImagemGrande(data)
          return
      }catch(err){
          console.error(err)
      }
  }

  const getOlderImage = async () => {

      try {
          const response = await axiosInstance.get(`/images/atual-image/${users[0].project_id}`)
          const data = await response.data
          if(data[0].text === "") return
          getImage(data[0].text)

      } catch (err) {
          console.error(err)
      }
  } 


    useEffect(() => {
      async function receivedMessage(message: Payload) {
          getImage(message.text)
          
      }
  
      async function joinChatRoom() {
          socket.emit('joinRoom', users[0].project_id);
          getOlderImage()
      }
  
      async function setupSocket() {
          socket.connect();
  
          socket.on('msgChangeImage', receivedMessage);
  
          socket.on('connect', joinChatRoom);
      }
  
      setupSocket();
  
      return () => {
          socket.disconnect();
          socket.off('msgChangeImage', receivedMessage);
          socket.off('connect', joinChatRoom);
      };
  }, [socket, users]);

    return (
        <section style={{display: 'flex'}}>
            <section style={{display: 'flex', flexDirection: 'column', width: '5%', padding: '25px 15px', background: '#101119', borderRight: 'solid 1px #141421'}}>
              <Image width={50} height={15} src="/logo.svg" alt="Logo RPG Master" onClick={exit}></Image> 

              <Link href={`/section`} style={{marginTop: '35px', justifyContent: "center", fontSize: '12px', display: 'flex', gap: '10px', color: "white", padding: '12px 10px', backgroundColor: isActive(`/section`) ? "#12131D" : "none", border: isActive(`/section`) ? "solid 1px #292943" : "none", borderRadius: '10px'}}><GoPeople style={{color: "white"}}/></Link>
              <div style={{marginTop: '15px',justifyContent: "center", fontSize: '12px', display: 'flex', gap: '10px', color: "white", padding: '12px 10px', backgroundColor: image ? "#12131D" : "none", border: image ? "solid 1px #292943" : "none", borderRadius: '10px', cursor: "pointer"}} onClick={() => setImage(!image)}><FaFilm style={{color: "white"}}/></div>
            
            </section>

            {children}

            {caracter[0] !== undefined && users[0] !== undefined && image &&  (
              <div style={{position: "fixed", borderRadius: "0px 10px 10px 0px ", marginLeft: "5%", background: "#12131D", height: "100vh", width: "1000px", padding: "20px 20px", marginRight: "5%"}}>
                 <ImagesMaster setModalImagem={setModalImagem} setImagemGrande={setImagemGrande}></ImagesMaster>
               </div>
            )}

            <img src={actualImagem} alt="Atual Image" style={{position: "fixed", bottom: 0, left: 0, width: "4%", margin: "0px 0px 10px 6px", border:"solid 2px #292943", borderRadius: "5px", cursor: "pointer"}} onClick={() => {
              setImagemGrande(actualImagem)
              setModalImagem(true)
            }}/>
            
            {modalImagem && <div onClick={() => setModalImagem(false)} style={{position: "absolute", zIndex: "999", alignItems: "center", justifyContent: "center", display:"flex", width: "100%", height:"100%", cursor: "pointer"}}><img src={imagemGrande} alt="Image em grande tamanho" style={{maxHeight: "100vh", maxWidth: "100%"}}/></div>}
            
            {caracter[0] !== undefined && users[0] !== undefined && <Chat users={users}></Chat>}
        </section>
    )
  }