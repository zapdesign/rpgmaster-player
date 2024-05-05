import { URL } from '@/services/baseURL';
import { io } from 'socket.io-client';
import { token } from '@/services/takeToken';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/services/axiosInstance';
import styles from '../popupimage.module.css'

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

export default function ImageActive({users}: any) {

    const [ actualImagem, setActualImage ] = useState('')

    const getImage = async (image: string) => {
        if(image === "") {
            setActualImage("")
            return
        }
        try{
            const response = await axiosInstance(`upload/get/${image}`)
            const data = await response.data
            const novaBase64Image = Buffer.from(data.data, 'binary').toString('base64');
            setActualImage(novaBase64Image)
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
            console.log("mensagem nova", message)
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
        <>
            {actualImagem === "" ? 
            <div></div> : 
            <div className={styles.fundoImagemGrande}>
                <img className={styles.imagemGrande} src={`data:image/jpeg;base64,${actualImagem}`} alt="Auto Image" />
            </div>
            }
        </>
    )
}