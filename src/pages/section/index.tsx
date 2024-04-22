import MenuPrincipal from "@/component/menu";
import BlocoPrincipal from "@/component/personagem/blocoPrincipal";
import AuthContent from "@/context/AuthContext";
import { axiosInstance } from "@/services/axiosInstance";
import { useCaracterStore } from "@/store/caracter";
import { useUsersStore } from "@/store/users/Index";
import styles from "./section.module.css"
import { useQuery } from "react-query";
import Forca from "@/component/personagem/testes/forca";
import Coracao from "@/component/personagem/testes/coracao";
import Persuasao from "@/component/personagem/testes/astucia";
import Inventario from "@/component/personagem/equipamentos/inventário";
import Armadura from "@/component/personagem/equipamentos/armadura";
import LadoDireito from "@/component/personagem/ladoDireito";
import { useState } from "react";
import { NameInput } from "@/component/personagem/name";

  
export default function SectionApp(){


    const { caracter, actions: { addCaracter } } = useCaracterStore()
    const { users } = useUsersStore()

    const [ newCaracter, setNewCaracter ] = useState({})

    const [ changes, setChanges ] = useState(false)

    const searchCaracter = async () => {
        try{
            const response = await axiosInstance.get(`/player/caracter/${users[0].id}`)
            const data = await response.data
            addCaracter(data) 
            setNewCaracter({...data})

        }catch(err){
            console.error(err)
        }
    }

    const changePlayer2 = async (data: any) => {
        try{

            await axiosInstance.patch(`player/caracter/${caracter[0].id}`, {
                ...newCaracter
            })

            setChanges(false)
            searchCaracter()

            return

        }catch(err){
            console.error(err)
        }
    }
    
    const changePlayer = () => setChanges(true)

    const { data, isLoading, isError } = useQuery('caracter', async () => {
        searchCaracter()
    },{
        enabled: users[0] !== undefined
    })

    return (
        <AuthContent>
            <MenuPrincipal>
                {newCaracter !== undefined && (
                <main className={styles.main}>

                    <NameInput newCaracter={newCaracter} changePlayer={changePlayer} changes={changes} changePlayer2={changePlayer2} setNewCaracter={setNewCaracter}></NameInput>

                    <div className={styles.alignFlex}>
                        <div className={styles.fundoEsquerdo}>
    
                            <BlocoPrincipal changePlayer={changePlayer} newCaracter={newCaracter} setNewCaracter={setNewCaracter}></BlocoPrincipal>

                            <div className={styles.testesOrganizacao}>
                                <Forca changePlayer={changePlayer} newCaracter={newCaracter} setNewCaracter={setNewCaracter}></Forca>
                                <Coracao changePlayer={changePlayer} newCaracter={newCaracter} setNewCaracter={setNewCaracter}></Coracao>
                                <Persuasao changePlayer={changePlayer} newCaracter={newCaracter} setNewCaracter={setNewCaracter}></Persuasao>
                            </div>

                            <div className={styles.barra}></div>

                            <div className={styles.inventarioOrganizacao}>
                                <Inventario></Inventario>

                                <div className={styles.barraVertical}></div>

                                <Armadura changePlayer={changePlayer} newCaracter={newCaracter} setNewCaracter={setNewCaracter}></Armadura>
                            </div>

                        </div>
                        <div className={styles.fundoDireito}>

                            <LadoDireito changePlayer={changePlayer} newCaracter={newCaracter} setNewCaracter={setNewCaracter}></LadoDireito>
                        </div>
                    </div>
                </main>
                )}
            </MenuPrincipal>
        </AuthContent>
    )
}