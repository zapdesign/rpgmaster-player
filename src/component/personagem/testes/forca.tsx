import { useCaracterStore } from "@/store/caracter"
import { useState } from "react"
import styles from './forca.module.css'
import CheckBoxEstrutura from "../checkbox/checkBoxEstrutura"
import { axiosInstance } from "@/services/axiosInstance"



export default function Forca({changePlayer, newCaracter, setNewCaracter}: any){

    const { caracter } = useCaracterStore()

    return (
        <>
        {caracter[0] !== undefined && (
            <div className={styles.fundoForca}>

                <p className={styles.titulo}>Força</p>

                <div className={styles.fundoLosanguloPoint}>
                    <div className={styles.ajeitarNA}>
                        <div className={styles.losanguloGrande} style={{marginLeft: '-55px'}}>
                            <input type="number" value={newCaracter.forca_na} onChange={(e) => {
                                changePlayer()
                                setNewCaracter({...newCaracter, forca_na: Number(e.target.value)})
                            }} className={styles.inputLosangulo} style={{fontSize: '35px'}}/>
                        </div>
                        <p className={styles.textNA}>NA</p>
                    </div>
                    <div className={styles.ajeitarCima}>
                        <div className={styles.losanguloPequeno} >
                            <input type="number" value={newCaracter.forca_nivel} onChange={(e) => {
                                changePlayer()
                                setNewCaracter({...newCaracter, forca_nivel: Number(e.target.value)})
                            }} className={styles.inputLosangulo}/>
                        </div>
                        <p className={styles.textosMenores}>Nível</p>
                    </div>
                    <div className={styles.ajeitarBaixo}>
                        <div className={styles.losanguloPequeno}>
                            <input type="number" value={newCaracter.forca_resistencia} onChange={(e) => {
                                changePlayer()
                                setNewCaracter({...newCaracter, forca_resistencia: Number(e.target.value)})
                            }} className={styles.inputLosangulo}/>
                        </div>
                            <p className={styles.textosMenores}>Resistência</p>
                    </div>
                </div>

                <div className={styles.barra}></div>

                <div className={styles.alinharCheckbox}>
                    <CheckBoxEstrutura nome={'Fascínio'} changedDado={'fascinio'} dadoPincipal={newCaracter.fascinio} dadosGerais={newCaracter.fascinio_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={caracter[0].id} haveInital={true}></CheckBoxEstrutura>
                    <CheckBoxEstrutura nome={'Atletismo'} changedDado={'atletismo'} dadoPincipal={newCaracter.atletismo} dadosGerais={newCaracter.atletismo_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={caracter[0].id} haveInital={true}></CheckBoxEstrutura>
                    <CheckBoxEstrutura nome={'Vigilância'} changedDado={'vigilancia'} dadoPincipal={newCaracter.vigilancia} dadosGerais={newCaracter.vigilancia_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={caracter[0].id} haveInital={true}></CheckBoxEstrutura>
                    <CheckBoxEstrutura nome={'Caçada'} changedDado={'cacada'} dadoPincipal={newCaracter.cacada} dadosGerais={newCaracter.cacada_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={caracter[0].id} haveInital={true}></CheckBoxEstrutura>
                    <CheckBoxEstrutura nome={'Música'} changedDado={'musica'} dadoPincipal={newCaracter.musica} dadosGerais={newCaracter.musica_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={caracter[0].id} haveInital={true}></CheckBoxEstrutura>
                    <CheckBoxEstrutura nome={'Ofício'} changedDado={'oficio'} dadoPincipal={newCaracter.oficio} dadosGerais={newCaracter.oficio_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={caracter[0].id} haveInital={true}></CheckBoxEstrutura>
                </div>

                <div className={styles.barraAbaixo}></div>

                <p className={styles.titulo2}>Proeficiências de combate</p>

                <div className={styles.alinharCheckbox}>
                    <CheckBoxEstrutura nome={'Machados'} changedDado={'machados'} dadoPincipal={newCaracter.machados_bool} dadosGerais={newCaracter.machados_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={caracter[0].id} haveInital={false}></CheckBoxEstrutura>
                    <CheckBoxEstrutura nome={'Arcos'} changedDado={'arcos'} dadoPincipal={newCaracter.arcos_bool} dadosGerais={newCaracter.arcos_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={caracter[0].id} haveInital={false}></CheckBoxEstrutura>
                    <CheckBoxEstrutura nome={'Lanças'} changedDado={'lancas'} dadoPincipal={newCaracter.lancas_bool} dadosGerais={newCaracter.lancas_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={caracter[0].id} haveInital={false}></CheckBoxEstrutura>
                    <CheckBoxEstrutura nome={'Espadas'} changedDado={'espadas'} dadoPincipal={newCaracter.espadas_bool} dadosGerais={newCaracter.espadas_bool} setNewCaracter={setNewCaracter} newCaracter={newCaracter} caracter={caracter[0].id} haveInital={false}></CheckBoxEstrutura>
                </div>
            </div>
        )}
        </>
    )
    
}
