import { useCaracterStore } from "@/store/caracter"
import { useState } from "react"
import styles from './forca.module.css'
import CheckBoxEstrutura from "../checkbox/checkBoxEstrutura"
import { axiosInstance } from "@/services/axiosInstance"



export default function Coracao({changePlayer, newCaracter, setNewCaracter}: any){

    const { caracter } = useCaracterStore()
    
    return (
        <>
        {caracter[0] !== undefined && (
            <div className={styles.fundoForca}>

                <p className={styles.titulo}>Coração</p>

                <div className={styles.fundoLosanguloPoint}>
                    <div className={styles.ajeitarNA}>
                        <div className={styles.losanguloGrande} style={{marginLeft: '-55px'}}>
                            <input type="number" value={newCaracter.coracao_na} onChange={(e) => {
                                changePlayer()
                                setNewCaracter({...newCaracter, coracao_na: Number(e.target.value)})
                            }} className={styles.inputLosangulo} style={{fontSize: '35px'}}/>
                        </div>
                        <p className={styles.textNA}>NA</p>
                    </div>
                    <div className={styles.ajeitarCima}>
                        <div className={styles.losanguloPequeno} >
                            <input type="number" value={newCaracter.coracao_nivel} onChange={(e) => {
                                changePlayer()
                                setNewCaracter({...newCaracter, coracao_nivel: Number(e.target.value)})
                            }} className={styles.inputLosangulo}/>
                        </div>
                        <p className={styles.textosMenores}>Nível</p>
                    </div>
                    <div className={styles.ajeitarBaixo}>
                        <div className={styles.losanguloPequeno}>
                            <input type="number" value={newCaracter.coracao_resistencia} onChange={(e) => {
                                changePlayer()
                                setNewCaracter({...newCaracter, coracao_resistencia: Number(e.target.value)})
                            }} className={styles.inputLosangulo}/>
                        </div>
                            <p className={styles.textosMenores}>Esperança</p>
                    </div>
                </div>

                <div className={styles.barra} style={{display: "flex", alignItems: "center", justifyContent: "center"}}><p className={styles.textSkills}>Skills</p></div>

                <div className={styles.alinharCheckbox}>
                    <CheckBoxEstrutura nome={'Indução'} changedDado={'inducao'} dadoPincipal={newCaracter.inducao} dadosGerais={newCaracter.inducao_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={caracter[0].id} haveInital={true}></CheckBoxEstrutura>
                    <CheckBoxEstrutura nome={'Viagem'} changedDado={'viagem'} dadoPincipal={newCaracter.viagem} dadosGerais={newCaracter.viagem_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={caracter[0].id} haveInital={true}></CheckBoxEstrutura>
                    <CheckBoxEstrutura nome={'Discernimento'} changedDado={'discernimento'} dadoPincipal={newCaracter.discernimento} dadosGerais={newCaracter.discernimento_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={caracter[0].id} haveInital={true}></CheckBoxEstrutura>
                    <CheckBoxEstrutura nome={'Cura'} changedDado={'cura'} dadoPincipal={newCaracter.cura} dadosGerais={newCaracter.cura_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={caracter[0].id} haveInital={true}></CheckBoxEstrutura>
                    <CheckBoxEstrutura nome={'Cortesia'} changedDado={'cortesia'} dadoPincipal={newCaracter.cortesia} dadosGerais={newCaracter.cortesia_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={caracter[0].id} haveInital={true}></CheckBoxEstrutura>
                    <CheckBoxEstrutura nome={'Batalha'} changedDado={'batalha'} dadoPincipal={newCaracter.batalha} dadosGerais={newCaracter.batalha_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={caracter[0].id} haveInital={true}></CheckBoxEstrutura>
                </div>

                <div className={styles.barraAbaixo}></div>

                <p className={styles.titulo2}>Recompensas</p>

                <div className={styles.alinharCheckbox}>

                    <div className={styles.ajeitarLosanguloBaixo}>
                            <p className={styles.textosBaixo}>Valor</p>

                            <div className={styles.losanguloPequenoBaixo}>
                                <input type="text" value={newCaracter.recompensa_valor} onChange={(e) => {
                                changePlayer()
                                setNewCaracter({...newCaracter, recompensa_valor: Number(e.target.value)})
                            }} className={styles.inputLosangulo}/>
                            </div>

                    </div>
                </div>

                <textarea placeholder='Digite aqui...' value={newCaracter.recompensa} onChange={(e) => {
                                changePlayer()
                                setNewCaracter({...newCaracter, recompensa: e.target.value})
                            }} className={styles.inputRecompensa}></textarea>

            </div>
        )}
        </>
    )
    
}
