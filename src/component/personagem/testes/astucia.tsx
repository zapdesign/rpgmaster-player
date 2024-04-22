import { useCaracterStore } from "@/store/caracter"
import { useState } from "react"
import styles from './forca.module.css'
import CheckBoxEstrutura from "../checkbox/checkBoxEstrutura"
import { axiosInstance } from "@/services/axiosInstance"



export default function Persuasao({changePlayer, newCaracter, setNewCaracter}: any){

    const { caracter } = useCaracterStore()

    return (
        <>
        {caracter[0] !== undefined && (
            <div className={styles.fundoForca}>

                <p className={styles.titulo}>Astúcia</p>

                <div className={styles.fundoLosanguloPoint}>
                    <div className={styles.ajeitarNA}>
                        <div className={styles.losanguloGrande} style={{marginLeft: '-55px'}}>
                            <input type="number" value={newCaracter.astucia_na} onChange={(e) => {
                                changePlayer()
                                setNewCaracter({...newCaracter, astucia_na: Number(e.target.value)})
                            }} className={styles.inputLosangulo} style={{fontSize: '35px'}}/>
                        </div>
                        <p className={styles.textNA}>NA</p>
                    </div>
                    <div className={styles.ajeitarCima}>
                        <div className={styles.losanguloPequeno} >
                            <input type="number" value={newCaracter.astucia_nivel} onChange={(e) => {
                                changePlayer()
                                setNewCaracter({...newCaracter, astucia_nivel: Number(e.target.value)})
                            }} className={styles.inputLosangulo}/>
                        </div>
                        <p className={styles.textosMenores}>Nível</p>
                    </div>
                    <div className={styles.ajeitarBaixo}>
                        <div className={styles.losanguloPequeno}>
                            <input type="number" value={newCaracter.astucia_resistencia} onChange={(e) => {
                                changePlayer()
                                setNewCaracter({...newCaracter, astucia_resistencia: Number(e.target.value)})
                            }} className={styles.inputLosangulo}/>
                        </div>
                            <p className={styles.textosMenores}>Bloqueio</p>
                    </div>
                </div>

                <div className={styles.barra}></div>

                <div className={styles.alinharCheckbox}>
                    <CheckBoxEstrutura nome={'Persuasão'} changedDado={'persuasao'} dadoPincipal={newCaracter.persuasao} dadosGerais={newCaracter.persuasao_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={caracter[0].id} haveInital={true}></CheckBoxEstrutura>
                    <CheckBoxEstrutura nome={'Furtividade'} changedDado={'furtividade'} dadoPincipal={newCaracter.furtividade} dadosGerais={newCaracter.furtividade_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={caracter[0].id} haveInital={true}></CheckBoxEstrutura>
                    <CheckBoxEstrutura nome={'Busca'} changedDado={'busca'} dadoPincipal={newCaracter.busca} dadosGerais={newCaracter.busca_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={caracter[0].id} haveInital={true}></CheckBoxEstrutura>
                    <CheckBoxEstrutura nome={'Exploração'} changedDado={'exploracao'} dadoPincipal={newCaracter.exploracao} dadosGerais={newCaracter.exploracao_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={caracter[0].id} haveInital={true}></CheckBoxEstrutura>
                    <CheckBoxEstrutura nome={'Enigma'} changedDado={'enigma'} dadoPincipal={newCaracter.enigma} dadosGerais={newCaracter.enigma_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={caracter[0].id} haveInital={true}></CheckBoxEstrutura>
                    <CheckBoxEstrutura nome={'História'} changedDado={'historia'} dadoPincipal={newCaracter.historia} dadosGerais={newCaracter.historia_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={caracter[0].id} haveInital={true}></CheckBoxEstrutura>
                </div>

                <div className={styles.barraAbaixo}></div>

                <p className={styles.titulo2}>Virtudes</p>

                <div className={styles.alinharCheckbox}>

                    <div className={styles.ajeitarLosanguloBaixo}>
                            <p className={styles.textosBaixo}>Sabedoria</p>

                            <div className={styles.losanguloPequenoBaixo}>
                                <input type="text" value={newCaracter.virtudes_sabedoria} onChange={(e) => {
                                changePlayer()
                                setNewCaracter({...newCaracter, virtudes_sabedoria: Number(e.target.value)})
                            }} className={styles.inputLosangulo}/>
                            </div>

                    </div>
                </div>

                <textarea placeholder='Digite aqui...' value={newCaracter.virtudes} onChange={(e) => {
                                changePlayer()
                                setNewCaracter({...newCaracter, virtudes: e.target.value})
                            }} className={styles.inputRecompensa}></textarea>
                
            </div>
        )}
        </>
    )
    
}
