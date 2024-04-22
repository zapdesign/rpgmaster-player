import styles from './equipamentos.module.css'
import { axiosInstance } from '@/services/axiosInstance'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useCaracterStore } from '@/store/caracter'
import { FaPlus } from "react-icons/fa6";
import { IoTrashOutline } from "react-icons/io5";


export default function Inventario(){

    const { caracter } = useCaracterStore()

    const [ equipamento, setEquipamento ] = useState([])

    const searchEquipament = async () => {  

        try{
            const response = await axiosInstance.get(`/player/equipament/${caracter[0].player_id}`)
            const data = await response.data
            setEquipamento(data)

        }catch(err){
            console.error(err)
        }
    }

    const createEquipament = async () => {
        try{
            await axiosInstance.post(`/player/equipament/${caracter[0].player_id}`)
            searchEquipament()

        }catch(err){
            console.error(err)
        }
    }

    const deleteEquipament = async (id: string) => {
        try{
            await axiosInstance.delete(`/player/equipament/${id}`)
            searchEquipament()

        }catch(err){
            console.error(err)
        }
    }


    const { data, isLoading, isError } = useQuery('equipament', async () => {
        await searchEquipament()
    },{
        enabled: caracter[0] !== undefined
    })


    return (
        <>
            {equipamento && (

                <div className={styles.fundoEquipamento}>
                    <div className={styles.fundoFlex}>
                        <div className={styles.fundoFlex30}>
                            <p className={styles.nameFont}>Equipamento de guerra</p>
                        </div>
                        <div className={styles.fundoFlex13}>
                            <p className={styles.label}>Dano</p>
                        </div>
                        <div className={styles.fundoFlex13}>
                            <p className={styles.label}>Ferimento</p>
                        </div>
                        <div className={styles.fundoFlex13}>
                            <p className={styles.label}>Carga</p>
                        </div>
                        <div className={styles.fundoFlex30}>
                            <p className={styles.label}>Anotações</p>
                        </div>
                    </div>

                    {equipamento[0] !== undefined && equipamento.map(cada => (
                        <div key={cada.id} className={styles.fundoFlexInput}>
                            <div className={styles.fundoFlex30}>
                                <input type="text" name='escudo' placeholder='Digite aqui...' value={cada.equipamento_de_guerra} onChange={(e) => setEquipamento({...equipamento, equipamento_de_guerra: e.target.value})} className={styles.inputGuerra}/>
                            </div>
                            <div className={styles.fundoFlex13}>
                                <input type="text" name='escudo' placeholder='Digite aqui...' value={cada.dano} onChange={(e) => setEquipamento({...equipamento, equipamento_de_guerra: e.target.value})} className={styles.inputGuerra}/>
                            </div>
                            <div className={styles.fundoFlex13}>
                                <input type="text" name='escudo' placeholder='Digite aqui...' value={cada.ferimento} onChange={(e) => setEquipamento({...equipamento, equipamento_de_guerra: e.target.value})} className={styles.inputGuerra}/>
                            </div>
                            <div className={styles.fundoFlex13}>
                                <input type="text" name='escudo' placeholder='Digite aqui...' value={cada.carga} onChange={(e) => setEquipamento({...equipamento, equipamento_de_guerra: e.target.value})} className={styles.inputGuerra}/>
                            </div>
                            <div className={styles.fundoFlex30}>
                                <input type="text" name='escudo' placeholder='Digite aqui...' value={cada.anotacao_equipamento} onChange={(e) => setEquipamento({...equipamento, equipamento_de_guerra: e.target.value})} className={styles.inputGuerra}/>
                            </div>

                            <IoTrashOutline style={{cursor: 'pointer'}} onClick={() => deleteEquipament(cada.id)}/>


                        </div>  
                    ))}
                    <div>
                        <FaPlus style={{cursor: 'pointer',height: '15px', width: '15px'}} onClick={createEquipament}/>
                    </div>
                </div>
            )}
        
        </>
    )
}