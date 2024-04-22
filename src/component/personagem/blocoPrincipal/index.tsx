import styles from './blocoPrincipal.module.css'
import { useState } from 'react'
import { useCaracterStore } from '@/store/caracter' 
import { axiosInstance } from '@/services/axiosInstance'


export default function BlocoPrincipal({changePlayer, newCaracter, setNewCaracter}: any){

    const { caracter } = useCaracterStore()

    return (
        <>
        {caracter[0] !== undefined && (
        <div>
            <div className={styles.fundoEsquerdo}>
                <div className={styles.culturaHeroica}>
                    <div className={styles.labelInput}>
                        <label htmlFor="cultura-heroica" className={styles.label}>Cultura Heróica</label>
                        <input type="text" name='cultura-heroica' placeholder='Digite aqui...' value={newCaracter.cultura_heroica} onChange={(e) => {
                                changePlayer()
                                setNewCaracter({...newCaracter, cultura_heroica: e.target.value})
                            }} className={styles.input}/>
                    </div>
                    <div className={styles.labelInput}>
                        <label htmlFor="bencao" className={styles.label}>Benção cultural</label>
                        <input type="text" name='bencao' placeholder='Digite aqui...' value={newCaracter.bencao_cultural} onChange={(e) => {
                                changePlayer()
                                setNewCaracter({...newCaracter, bencao_cultural: e.target.value})
                            }} className={styles.input}/>
                    </div>
                    <div className={styles.labelInput}>
                        <label htmlFor="chamado" className={styles.label}>Chamado</label>
                        <input type="text" name='chamado' placeholder='Digite aqui...' value={newCaracter.chamado} onChange={(e) => {
                                changePlayer()
                                setNewCaracter({...newCaracter, chamado: e.target.value})
                            }} className={styles.input}/>
                    </div>
                </div>
                <div className={styles.idade}>
                    <div className={styles.idadePequeno}>
                        <div className={styles.idadeHeader80}>
                            <div className={styles.idadePequeno}>
                                <div className={styles.labelInput}>
                                    <label htmlFor="idade" className={styles.label}>Idade</label>
                                    <input type="number" name='idade' placeholder='Digite aqui...' value={newCaracter.idade} onChange={(e) => {
                                changePlayer()
                                setNewCaracter({...newCaracter, idade: e.target.value})
                            }} className={styles.input}/>
                                </div>

                                <div className={styles.labelInput}>
                                    <label htmlFor="vida" className={styles.label}>Vida</label>
                                    <input type="number" name='vida' placeholder='Digite aqui...' value={newCaracter.padrao_de_vida} onChange={(e) => {
                                changePlayer()
                                setNewCaracter({...newCaracter, padrao_de_vida: e.target.value})
                            }} className={styles.input}/>
                                </div>
                            </div>

                            <div className={styles.labelInput}>
                                <label htmlFor="patrono" className={styles.label}>Patrono</label>
                                <input type="text" name='patrono' placeholder='Digite aqui...' value={newCaracter.patrono} onChange={(e) => {
                                changePlayer()
                                setNewCaracter({...newCaracter, patrono: e.target.value})
                            }} className={styles.input}/>
                            </div>
                        </div>
                        <div className={styles.tesouro}>
                            <div className={styles.labelInput} style={{height: '100%'}} >
                                <label htmlFor="tesouro" className={styles.label}>Tesouro</label>
                                <input type="number" name='tesouro' placeholder='0' value={newCaracter.tesouro} onChange={(e) => {
                                changePlayer()
                                setNewCaracter({...newCaracter, tesouro: e.target.value})
                            }} style={{fontSize: '25px'}} className={styles.inputTesouro}/>
                            </div>
                        </div>

                    </div>
                    <div className={styles.labelInput}>
                        <label htmlFor="sombras" className={styles.label}>Caminho das sombras</label>
                        <input type="text" name='sombras' placeholder='Digite aqui...' value={newCaracter.caminho_das_sombras} onChange={(e) => {
                                changePlayer()
                                setNewCaracter({...newCaracter, caminho_das_sombras: e.target.value})
                            }} className={styles.input}/>
                    </div> 

                </div>
                <div className={styles.culturaHeroica}>
                    <div className={styles.labelInput} style={{height: '68%'}}>
                            <label htmlFor="caracteristicas" className={styles.label}>Características Notáveis</label>
                            <textarea name='caracteristicas' placeholder='Digite aqui...' onChange={(e) => {
                                changePlayer()
                                setNewCaracter({...newCaracter, caracteristicas_notaveis: e.target.value})
                            }} value={newCaracter.caracteristicas_notaveis} style={{textAlign: 'start', resize: 'none'}} className={styles.inputTesouro}></textarea>
                    </div>
                    <div className={styles.labelInput}>
                            <label htmlFor="falhas" className={styles.label}>Falhas</label>
                            <input type="text" name='falhas' placeholder='Digite aqui...' value={newCaracter.falhas} onChange={(e) => {
                                changePlayer()
                                setNewCaracter({...newCaracter, falhas: e.target.value})
                            }} className={styles.input}/>
                    </div>
                </div>
            </div>
        </div>
        )}
        </>
    )
}