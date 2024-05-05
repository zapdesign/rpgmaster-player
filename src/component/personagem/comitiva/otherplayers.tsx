import { axiosInstance } from "@/services/axiosInstance";
import styles from "./comitiva.module.css"
import CheckBoxEstrutura from "../checkbox/checkBoxEstrutura";
import { useEffect, useState } from "react";


export default function OtherPlayers({cada, setImagePlayer, setAtualPlayer}: any) {

    const [ myImage, setMyImage ] = useState('')
    const [ canClick, setCanClick ] = useState(false)
    const isName = false 

    const getImage = async () => {
        try{
            const novaResponse = await axiosInstance.get(`/upload/get/player-${cada.player_id}`);
            if(novaResponse.data === "Image not found"){
                setMyImage("")
                return
            }
            const novaBase64Image = Buffer.from(novaResponse.data, 'binary').toString('base64');
            setMyImage(novaBase64Image)
            setCanClick(true)
    
        }catch(err){
            console.error(err)
        }
        
    }

    useEffect(() => {
        getImage()
    },[])

    return (
        <div className={styles.alignImage}>
            <div className={styles.image}  style={{cursor: "pointer"}} onClick={() => {
                if(!canClick) return
                setImagePlayer(true)
                setAtualPlayer(myImage)
            }}>
            <img className={styles.image} src={`data:image/jpeg;base64,${myImage}`} ></img>
            </div>
            <div className={styles.labelInput} style={{width: "30%"}}>
                <label htmlFor="nome" className={styles.label}>Nome</label>
                <input type="text" name='nome' placeholder='Digite aqui...' value={cada.nome} onChange={(e) => {
                        if(isName){
                            return
                        }
                    }} className={styles.input} />
            </div>
            <div className={styles.labelInput} style={{width: "40%"}}>
                <label htmlFor="papel" className={styles.label}>Papel de Jornada</label>
                <input type="text" name='papel' placeholder='Digite aqui...' value={cada.papel} onChange={(e) => {
                        if(isName){
                            return
                        }
                    }} className={styles.input} />
            </div>

            <div className={styles.labelInput} style={{width: "15%"}}>
                        <label htmlFor="fadiga" className={styles.label}>Fadiga</label>
                        <input type="number" name='fadiga' placeholder='Digite aqui...' value={cada.fadiga_da_viagem} onChange={(e) => {
                        }} className={styles.input} />
                    </div>
        </div>
    )
}