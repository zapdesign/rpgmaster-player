import { axiosInstance } from "@/services/axiosInstance";
import styles from "./comitiva.module.css"
import { useCaracterStore } from "@/store/caracter";
import { useState } from "react";
import { useQuery } from "react-query";
import CheckBoxEstrutura from "../checkbox/checkBoxEstrutura";
import { useUsersStore } from "@/store/users/Index";
import { Comitiva } from "@/pages/section";
import OtherPlayers from "./otherplayers";

export default function Companhia({comitiva, setNewComitiva, setChanges, setImagePlayer, setAtualPlayer}: any) {

    const { caracter } = useCaracterStore()
    const { users } = useUsersStore()
    const [ myImage, setMyImage ] = useState('')

    const isName = false

    const [ otherPlayers, setOtherPlayers ] = useState([])

    const getImage = async () => {
        try{
            const response= await axiosInstance.get(`/upload/get/player-${caracter[0].id}`);
            const data = await response.data
            setMyImage(data)

        }catch(err){
            console.error(err)
        }
        
    };

    const getAllComitiva = async () => {
        try{
            const response = await axiosInstance.get(`/player/all-comitiva/${users[0].project_id}`);
            const responseData = await response.data
            const data = responseData.filter((cada: Comitiva) => cada.player_id !== caracter[0].id)
            setOtherPlayers(data)

        }catch(err){
            console.error(err)
        }
        
    };

    const { data, isLoading } = useQuery("myImagee", () => {
        getImage()
        getAllComitiva()
    },{
        enabled: caracter[0] !== undefined
    })

    if(isLoading){
        return <p>Carregando...</p>
    }

    return (
        <div className={styles.companhia}>
            <p className={styles.nameFont}>A Companhia</p>

            <div className={styles.alignImage}>
                <div className={styles.image}>
                <img className={styles.image} src={`${myImage}`}></img>
                </div>
                <div className={styles.labelInput} style={{width: "30%"}}>
                    <label htmlFor="nome" className={styles.label}>Nome</label>
                    <input type="text" name='nome' placeholder='Digite aqui...' value={comitiva.nome} onChange={(e) => {
                        if(isName){
                            return
                        }
                    }} className={styles.input} />
                </div>
                <div className={styles.labelInput} style={{width: "40%"}}>
                    <label htmlFor="papel" className={styles.label}>Papel de Jornada</label>
                    <input type="text" name='papel' placeholder='Digite aqui...' value={comitiva.papel} onChange={(e) => {
                        setNewComitiva({...comitiva, papel: e.target.value})
                        setChanges(true)
                    }} className={styles.input} />
                </div>
                
                {caracter[0] !== undefined && (
                    <div className={styles.labelInput} style={{width: "15%"}}>
                        <label htmlFor="fadiga" className={styles.label}>Fadiga</label>
                        <input type="number" name='fadiga' placeholder='Digite aqui...' value={comitiva.fadiga_da_viagem} onChange={(e) => {
                            setNewComitiva({...comitiva, fadiga_da_viagem: Number(e.target.value)})
                            setChanges(true)
                        }} className={styles.input} />
                    </div>
                )}
            </div>

            {otherPlayers[0] !== undefined && otherPlayers.map((cada: Comitiva) => (
                <div key={cada.id}>
                    <OtherPlayers cada={cada} setAtualPlayer={setAtualPlayer} setImagePlayer={setImagePlayer}></OtherPlayers>
                </div>
            ))}
                
        </div>
    )
}