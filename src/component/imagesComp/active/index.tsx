import { URL } from '@/services/baseURL';
import { io } from 'socket.io-client';
import { token } from '@/services/takeToken';
import { useEffect, useState } from 'react';
import { useUsersStore } from '@/store/users/Index';
import { axiosInstance } from '@/services/axiosInstance';


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

export default function ImageActive() {

    const [ actualImagem, setActualImage ] = useState('')
    const { users } = useUsersStore()

    const getImage = async (image: string) => {
        try{
            const response = await axiosInstance(`upload/get/${image}`)
            const data = await response.data
            const novaBase64Image = Buffer.from(data.data, 'binary').toString('base64');
            setActualImage(novaBase64Image)
        }catch(err){
            console.error(err)
        }
    }

    const getOlderImage = async () => {

        try {
            console.log(`/images/atual-image/${users[0].project_id}`)
            const response = await axiosInstance.get(`/images/atual-image/${users[0].project_id}`)
            const data = await response.data
            console.log(data)
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
            if (users[0] && users[0].project_id) {
                socket.emit('joinRoom', users[0].project_id);
                getOlderImage()
            } else {
            }
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
            {actualImagem === "" ? <div></div> : <img src={`data:image/jpeg;base64,${actualImagem}`} alt="Auto Image" />}
        </>
    )
}