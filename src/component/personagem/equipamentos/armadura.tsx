import { useCaracterStore } from '@/store/caracter'
import styles from './equipamentos.module.css'
import { useState } from 'react'
import { axiosInstance } from '@/services/axiosInstance'

export default function Armadura({changePlayer, newCaracter, setNewCaracter}: any){
    return (
        <div className={styles.fundoArmadura}>

            <div className={styles.fundoFlex}>
                <div className={styles.fundoFlex60}>
                    <div className={styles.labelInput}>
                        <label htmlFor="armadura" className={styles.label}>Armadura</label>
                        <input type="text" name='armadura' placeholder='Digite aqui...' value={newCaracter.armadura} onChange={(e) => {
                                changePlayer()
                                setNewCaracter({...newCaracter, armadura: e.target.value})
                            }} className={styles.inputNome}/>
                    </div>
                </div>
                <div className={styles.fundoFlex20}>
                    <div className={styles.labelInput}>
                        <label htmlFor="armadura_protecao" className={styles.label}>Proteção</label>
                        <input type="number" name='armadura_protecao' placeholder='Digite aqui...' value={newCaracter.armadura_protecao} onChange={(e) => {
                                changePlayer()
                                setNewCaracter({...newCaracter, armadura_protecao: Number(e.target.value)})
                            }} className={styles.inputNome}/>
                    </div>
                </div>
                <div className={styles.fundoFlex20}>
                    <div className={styles.labelInput}>
                        <label htmlFor="armadura_carga" className={styles.label}>Carga</label>
                        <input type="number" name='armadura_carga' placeholder='Digite aqui...' value={newCaracter.armadura_carga} onChange={(e) => {
                                changePlayer()
                                setNewCaracter({...newCaracter, armadura_carga: Number(e.target.value)})
                            }} className={styles.inputNome}/>
                    </div>
                </div>
            </div>
            <div className={styles.fundoFlex}>
                <div className={styles.fundoFlex60}>
                    <div className={styles.labelInput}>
                        <label htmlFor="elmo" className={styles.label}>Elmo</label>
                        <input type="text" name='elmo' placeholder='Digite aqui...' value={newCaracter.elmo} onChange={(e) => {
                                changePlayer()
                                setNewCaracter({...newCaracter, elmo: e.target.value})
                            }} className={styles.inputNome}/>
                    </div>
                </div>
                <div className={styles.fundoFlex20}>
                    <div className={styles.labelInput}>
                        <label htmlFor="elmo_protecao" className={styles.label}>Proteção</label>
                        <input type="number"  name='elmo_protecao' placeholder='Digite aqui...' value={newCaracter.elmo_protecao} onChange={(e) => {
                                changePlayer()
                                setNewCaracter({...newCaracter, elmo_protecao: Number(e.target.value)})
                            }} className={styles.inputNome}/>
                    </div>
                </div>
                <div className={styles.fundoFlex20}>
                    <div className={styles.labelInput}>
                        <label htmlFor="elmo_carga" className={styles.label}>Carga</label>
                        <input type="number" name='elmo_carga' placeholder='Digite aqui...' value={newCaracter.elmo_carga} onChange={(e) => {
                                changePlayer()
                                setNewCaracter({...newCaracter, elmo_carga: Number(e.target.value)})
                            }} className={styles.inputNome}/>
                    </div>
                </div>
            </div>
            <div className={styles.fundoFlex}>
                <div className={styles.fundoFlex60}>
                    <div className={styles.labelInput}>
                        <label htmlFor="escudo" className={styles.label}>Escudo</label>
                        <input type="text" name='escudo' placeholder='Digite aqui...' value={newCaracter.escudo} onChange={(e) => {
                                changePlayer()
                                setNewCaracter({...newCaracter, escudo: e.target.value})
                            }} className={styles.inputNome}/>
                    </div>
                </div>
                <div className={styles.fundoFlex20}>
                    <div className={styles.labelInput}>
                        <label htmlFor="escudo_protecao" className={styles.label}>Bloqueio</label>
                        <input type="number" name='escudo_protecao' placeholder='Digite aqui...' value={newCaracter.escudo_protecao} onChange={(e) => {
                                changePlayer()
                                setNewCaracter({...newCaracter, escudo_protecao: Number(e.target.value)})
                            }} className={styles.inputNome}/>
                    </div>
                </div>
                <div className={styles.fundoFlex20}>
                    <div className={styles.labelInput}>
                        <label htmlFor="escudo_carga" className={styles.label}>Carga</label>
                        <input type="number" name='escudo_carga' placeholder='Digite aqui...' value={newCaracter.escudo_carga} onChange={(e) => {
                                changePlayer()
                                setNewCaracter({...newCaracter, escudo_carga: Number(e.target.value)})
                            }} className={styles.inputNome}/>
                    </div>
                </div>
            </div>

        </div>
    )
}