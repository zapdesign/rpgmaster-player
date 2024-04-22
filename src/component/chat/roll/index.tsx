import styles from './rollChoice.module.css'
import Image from "next/image"
import { useState } from "react"

const forca = [
    {
        id: 1,
        nome_normal: "Fascínio",
        nome_simples: "fascinio"
    },
    {
        id: 2,
        nome_normal: "Atletismo",
        nome_simples: "atletismo"
    },
    {
        id: 3,
        nome_normal: "Vigilância",
        nome_simples: "vigilancia"
    },
    {
        id: 4,
        nome_normal: "Caçada",
        nome_simples: "cacada"
    },
    {
        id: 5,
        nome_normal: "Música",
        nome_simples: "musica"
    },
    {
        id: 6,
        nome_normal: "Ofício",
        nome_simples: "oficio"
    }
]

const coracao = [
    {
        id: 1,
        nome_normal: "Indução",
        nome_simples: "inducao",
    },
    {
        id: 2,
        nome_normal: "Viagem",
        nome_simples: "viagem",
    },
    {
        id: 3,
        nome_normal: "Discernimento",
        nome_simples: "discernimento",
    },
    {
        id: 4,
        nome_normal: "Cura",
        nome_simples: "cura",
    },
    {
        id: 5,
        nome_normal: "Cortesia",
        nome_simples: "cortesia",
    },
    {
        id: 6,
        nome_normal: "Batalha",
        nome_simples: "batalha",
    }
];

const astucia = [
    {
        id: 1,
        nome_normal: "Persuasão",
        nome_simples: "persuasao",
    },
    {
        id: 2,
        nome_normal: "Furtividade",
        nome_simples: "furtividade",
    },
    {
        id: 3,
        nome_normal: "Busca",
        nome_simples: "busca",
    },
    {
        id: 4,
        nome_normal: "Exploração",
        nome_simples: "exploracao",
    },
    {
        id: 5,
        nome_normal: "Enigma",
        nome_simples: "enigma",
    },
    {
        id: 6,
        nome_normal: "História",
        nome_simples: "historia",
    }
];



export default function RollChoice({rollTestOn ,setRollTestOn, choice, setChoice,setRolling, setTest}: any){

    return (
        <> 

            {rollTestOn && (
                <div className={styles.fundoTest}>
                    {choice[0] !== undefined && choice.map((cada: any) => (
                        <p key={cada.id} className={styles.textChoice} onClick={() => {
                            setRolling(true)
                            setRollTestOn(false)
                            setTest(cada.nome_simples)
                            setChoice([])
                        }}>{cada.nome_normal}</p>
                    ))}
                </div>
            )}

            <div className={styles.fundo}>
                <div className={styles.fundoFlex} onClick={() => {
                    if(choice !== forca){
                        setChoice(forca)
                        setRollTestOn(true)  
                        return
                    }
                    setRollTestOn(!rollTestOn)  
                    setChoice([])
                }}>
                    <Image width={25} height={25} alt="sword icon" src="/Sword.svg"></Image>
                    <p className={styles.TextInitial}>Força</p>    
                </div>
                <div className={styles.fundoFlex} onClick={() => {
                    if(choice !== coracao){
                        setChoice(coracao)
                        setRollTestOn(true)  
                        return
                    }
                    setRollTestOn(!rollTestOn)  
                    setChoice([])
                }}>
                    <Image width={25} height={25} alt="heart icon" src="/health.svg"></Image>
                    <p className={styles.TextInitial}>Coração</p>    
                </div>
                <div className={styles.fundoFlex} onClick={() => {
                    if(choice !== astucia){
                        setChoice(astucia)
                        setRollTestOn(true)  
                        return
                    }
                    setRollTestOn(!rollTestOn)  
                    setChoice([])
                }}>
                    <Image width={25} height={25} alt="brain icon" src="/brain.svg"></Image>
                    <p className={styles.TextInitial}>Astúcia</p>    
                </div>
            </div>
        </>
    )
}