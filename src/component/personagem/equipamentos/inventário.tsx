import styles from './equipamentos.module.css'
import { axiosInstance } from '@/services/axiosInstance'
import { use, useState } from 'react'
import { useQuery } from 'react-query'
import { useCaracterStore } from '@/store/caracter'
import { IoTrashOutline } from "react-icons/io5";
import { PlayerInventory } from '@/pages/section'
import { Dispatch } from 'react';


export default function Inventario({equip, searchEquipament}: any){

    const { caracter } = useCaracterStore()

    const [ changes, setChanges ] = useState(false)


    const [ cada, setEquipamento ] = useState(equip)

    const attEquip = async (event: any) => {
        setChanges(false)
        try{
            await axiosInstance.patch(`player/equipament/${cada.id}`, {
                ...cada
            })
            return

        }catch(err){
            console.error(err)
        }
    }
    

    const deleteEquipament = async () => {
        try{
            await axiosInstance.delete(`/player/equipament/${cada.id}`)
            searchEquipament(cada.player_id)

        }catch(err){
            console.error(err)
        }
    }


    return (
        <>
        <div key={cada.id} className={styles.fundoFlexInput}>
            <div className={styles.fundoFlex35}>
                {changes && (
                    <button className={styles.button} onClick={attEquip}>Salvar</button>
                )}
                <input type="text" name='equipamento' placeholder='Digite aqui...' value={cada.equipamento_de_guerra} onChange={(e) => {
                    setEquipamento({...cada, equipamento_de_guerra: e.target.value}) 
                    setChanges(true)
                    }} className={styles.inputGuerra}/>
            </div>
            <div className={styles.fundoFlex10}>
                <input type="text" name='dano' placeholder='Digite aqui...' value={cada.dano} onChange={(e) => {
                    setEquipamento({...cada, dano: Number(e.target.value)}) 
                    setChanges(true)
                    }} className={styles.inputGuerra}/>
            </div>
            <div className={styles.fundoFlex10}>
                <input type="text" name='ferimento' placeholder='Digite aqui...' value={cada.ferimento} onChange={(e) => {
                    setEquipamento({...cada, ferimento: Number(e.target.value)}) 
                    setChanges(true)
                    }} className={styles.inputGuerra}/>
            </div>
            <div className={styles.fundoFlex10}>
                <input type="text" name='carga' placeholder='Digite aqui...' value={cada.carga} onChange={(e) => {
                    setEquipamento({...cada, carga: Number(e.target.value)}) 
                    setChanges(true)
                    }} className={styles.inputGuerra}/>
            </div>
            <div className={styles.fundoFlex35}>
                <input type="text" name='anotacao_equipamento' placeholder='Digite aqui...' value={cada.anotacao_equipamento} onChange={(e) => {
                    setEquipamento({...cada, anotacao_equipamento: e.target.value}) 
                    setChanges(true)
                    }} className={styles.inputGuerra}/>
            </div>

            <IoTrashOutline style={{cursor: 'pointer', color: "white"}} onClick={deleteEquipament}/>
        </div>  

        </>
    )
}