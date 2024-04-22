import { useCaracterStore } from "@/store/caracter"
import styles from "./nameInput.module.css"
import { useState } from "react"
import Image from "next/image"

export function NameInput({changePlayer,newCaracter, changes, changePlayer2, setNewCaracter}: any){

    return (
        <>
            {newCaracter !== undefined && (
            <div className={styles.labelCheck}>
                <div className={styles.labelInput}>
                    <p className={styles.nameFont}>Nome</p>
                    <input type="text" placeholder='Seu nome aqui...' value={newCaracter.name} onChange={(e) => {
                        changePlayer({name: e.target.value})
                        setNewCaracter({...newCaracter, name: e.target.value})
                    }} style={{fontSize: '17px', textAlign: 'center', width: '450px'}} className={styles.input}/>
                </div>

                <div className={styles.fundoCheck}>
                    {changes ? (
                        <button className={styles.button} onClick={changePlayer2}>Salvar Mudanças</button>
                    ): (
                        <Image width={15} height={15} alt="Check" src='/Checked.svg'></Image>
                    )}
                </div>
            </div>

            )}
        </>
    )
}