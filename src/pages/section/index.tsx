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
import Comitiva from "@/component/personagem/comitiva";
import { FaPlus } from "react-icons/fa6";


export interface Comitiva {
    id: string;
    player_id: string;
    project_id: string;
    ano: string;
    estacao: string;
    jornada_de: string;
    destino: string;
    dias_de_viagem: string;
    nome: string;
    papel: string;
    fadiga_da_viagem: number;
    ponei_1: string;
    p1_vigor: number;
    ponei_2: string;
    p2_vigor: number;
    ponei_3: string;
    p3_vigor: number;
    diario: string;
}

export interface PlayerInventory {
    id: string
    player_id: string
    equipamento_de_guerra: string
    dano: number
    ferimento: number
    carga: number
    anotacao_equipamento: string
    created_at: Date
}

interface Character {
    name: string; 
    player_id: string;
    image: string;
    cultura_heroica: string;
    idade: string;
    padrao_de_vida: string;
    bencao_cultural: string;
    patrono: string;
    chamado: string;
    caminho_das_sombras: string;
    tesouro: string;
    caracteristicas_notaveis: string;
    falhas: string;
  
    forca_na: number;
    forca_nivel: number;
    forca_resistencia: number;
  
    fascinio: boolean;
    fascinio_bool: number;
    atletismo: boolean;
    atletismo_bool: number;
    vigilancia: boolean;
    vigilancia_bool: number;
    cacada: boolean;
    cacada_bool: number;
    musica: boolean;
    musica_bool: number;
    oficio: boolean;
    oficio_bool: number;

    machados_bool: number;
    arcos_bool: number;
    lancas_bool: number;
    espadas_bool: number;
  
  
    coracao_na: number;
    coracao_nivel: number;
    coracao_resistencia: number;

    inducao: boolean;
    inducao_bool: number;
    viagem: boolean;
    viagem_bool: number;
    discernimento: boolean;
    discernimento_bool: number;
    cura: boolean;
    cura_bool: number;
    cortesia: boolean;
    cortesia_bool: number;
    batalha: boolean;
    batalha_bool: number;
    
    recompensa: string;
    recompensa_valor: number;
    

    astucia_na: number;
    astucia_nivel: number;
    astucia_resistencia: number;

    persuasao: boolean;
    persuasao_bool: number;
    furtividade: boolean;
    furtividade_bool: number;
    busca: boolean;
    busca_bool: number;
    exploracao: boolean;
    exploracao_bool: number;
    enigma: boolean;
    enigma_bool: number;
    historia: boolean;
    historia_bool: number;
  
    virtudes: string;
    virtudes_sabedoria: number;
  
    armadura: string;
    armadura_protecao: number;
    armadura_carga: number;
    
    elmo: string;
    elmo_protecao: number;
    elmo_carga: number;

    escudo: string;
    escudo_protecao: number;
    escudo_carga: number;


    pontos_de_aventura: number;
    pontos_de_pericia: number;
    pontos_de_sociedade: number;

    carga_atual: number;
    carga: number;
    fadiga: number;

    esperanca_atual: number;
    sombra: number;
    cicatrizes_sombra: number;

    ferimento: string;
    tempo_ferimento: number;

    exausto: boolean;
    arrasado: boolean;
    ferido: boolean;

    equipamento_de_viagem: string;
}

  
export default function SectionApp(){


    const { caracter, actions: { addCaracter } } = useCaracterStore()
    const { users } = useUsersStore()

    const [ newCaracter, setNewCaracter ] = useState<Character>({
        name: "", 
        player_id: "",
        image: '',
        cultura_heroica: '',
        idade: '',
        padrao_de_vida: '',
        bencao_cultural: '',
        patrono: '',
        chamado: '',
        caminho_das_sombras: '',
        tesouro: '',
        caracteristicas_notaveis: '',
        falhas: '',
      
        forca_na: 0,
        forca_nivel: 0,
        forca_resistencia: 0,
      
        fascinio: false,
        fascinio_bool: 0,
        atletismo: false,
        atletismo_bool: 0,
        vigilancia: false,
        vigilancia_bool: 0,
        cacada: false,
        cacada_bool: 0,
        musica: false,
        musica_bool: 0,
        oficio: false,
        oficio_bool: 0,

        machados_bool: 0,
        arcos_bool: 0,
        lancas_bool: 0,
        espadas_bool: 0,
      
      
        coracao_na: 0,
        coracao_nivel: 0,
        coracao_resistencia: 0,

        inducao: false,
        inducao_bool: 0,
        viagem: false,
        viagem_bool: 0,
        discernimento: false,
        discernimento_bool: 0,
        cura: false,
        cura_bool: 0,
        cortesia: false,
        cortesia_bool: 0,
        batalha: false,
        batalha_bool: 0,
        
        recompensa: '',
        recompensa_valor: 0,
        

        astucia_na: 0,
        astucia_nivel: 0,
        astucia_resistencia: 0,

        persuasao: false,
        persuasao_bool: 0,
        furtividade: false,
        furtividade_bool: 0,
        busca: false,
        busca_bool: 0,
        exploracao: false,
        exploracao_bool: 0,
        enigma: false,
        enigma_bool: 0,
        historia: false,
        historia_bool: 0,
      
        virtudes: '',
        virtudes_sabedoria: 0,
      
        
        armadura: '',
        armadura_protecao: 0,
        armadura_carga: 0,
        
        elmo: '',
        elmo_protecao: 0,
        elmo_carga: 0,

        escudo: '',
        escudo_protecao: 0,
        escudo_carga: 0,


        pontos_de_aventura: 0,
        pontos_de_pericia: 0,
        pontos_de_sociedade: 0,

        carga_atual: 0,
        carga: 0,
        fadiga: 0,

        esperanca_atual: 0,
        sombra: 0,
        cicatrizes_sombra: 0,

        ferimento: '',
        tempo_ferimento: 0,

        exausto: false,
        arrasado: false,
        ferido: false,

        equipamento_de_viagem: ''
    })

    const [ comitiva, setNewComitiva ] = useState<Comitiva>({
        id: "",
        player_id: "",
        project_id: "",
        ano: '',
        estacao: '',
        jornada_de: '',
        destino: '',
        dias_de_viagem: '',
        nome: "",
        papel: '',
        fadiga_da_viagem: 0,
        ponei_1: '',
        p1_vigor: 0,
        ponei_2: '',
        p2_vigor: 0,
        ponei_3: '',
        p3_vigor: 0,
        diario: ''
    })

    const [ equipamento, setEquipamento ] = useState<PlayerInventory[]>([])
    
    const [ changes, setChanges ] = useState(false)

    const [ havePerson, setHavePerson ] = useState(false)

    const [ imagePlayer, setImagePlayer ] = useState(false)
    const [ atualPlayer, setAtualPlayer ] = useState("")
 
    const searchCaracter = async () => {
        try{
            const response = await axiosInstance.get(`/player/caracter/${users[0].id}`)
            const data = await response.data
            addCaracter(data) 
            setNewCaracter({...data})
            await searchComitiva(data.id)
            await searchEquipament(data.player_id)
            setHavePerson(true)
        }catch(err){
            console.error(err)
        }
    }

    const searchComitiva = async (id: string) => {
        try{
            const response = await axiosInstance.get(`/player/comitiva/${id}`)
            const data = await response.data
            setNewComitiva({...data})

        }catch(err){
            console.error(err)
        }
    }

    const searchEquipament = async (id: string) => {  

        try{
            const response = await axiosInstance.get(`/player/equipament/${id}`)
            const data = await response.data
            setEquipamento(data)

        }catch(err){
            console.error(err)
        }
    }

    const createEquipament = async () => {
        try{
            await axiosInstance.post(`/player/equipament/${caracter[0].player_id}`)
            searchEquipament(caracter[0].player_id)

        }catch(err){
            console.error(err)
        }
    }

    const changePlayer2 = async (data: any) => {
        try{

            await axiosInstance.patch(`player/caracter/${caracter[0].id}`, {
                ...newCaracter
            })

            await axiosInstance.patch(`player/comitiva/${caracter[0].id}`, {
                ...comitiva
            })

            setChanges(false)
            searchCaracter()
            searchComitiva(caracter[0].id)
            searchEquipament(caracter[0].id)

            return

        }catch(err){
            console.error(err)
        }
    }
    
    const changePlayer = () => setChanges(true)

    const { data, isLoading, isError } = useQuery('caracter', async () => {
        searchCaracter()
    },{
        enabled: users[0] !== undefined,
    })

    return (
        <AuthContent>
            <MenuPrincipal>
                {havePerson && (
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
                                <div className={styles.fundoEquipamento}>
                                    <div className={styles.fundoFlexInput}>
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
                                    {equipamento[0] && equipamento.map((cada) => (
                                        <div key={cada.id}>
                                            <Inventario equip={cada}  searchEquipament={searchEquipament}></Inventario>
                                        </div>
                                    ))}
                                    <div>
                                        <FaPlus style={{cursor: 'pointer',height: '15px', width: '15px'}} onClick={createEquipament}/>
                                    </div>
                                </div>


                                <Armadura changePlayer={changePlayer} newCaracter={newCaracter} setNewCaracter={setNewCaracter}></Armadura>
                            </div>

                        </div>
                        <div className={styles.fundoDireito}>

                            <LadoDireito changePlayer={changePlayer} newCaracter={newCaracter} setNewCaracter={setNewCaracter}></LadoDireito>
                        </div>

                    </div>

                    <div className={styles.barraInicial}></div>

                    {comitiva !== undefined && (
                        <Comitiva comitiva={comitiva} setNewComitiva={setNewComitiva} setChanges={setChanges} setAtualPlayer={setAtualPlayer} setImagePlayer={setImagePlayer}></Comitiva>
                    )}

                    {imagePlayer && (
                        <div className={styles.fundoImagemGrande} onClick={() => {
                            setImagePlayer(false)
                            setAtualPlayer("")
                        }}><img className={styles.imagemGrande} src={`data:image/jpeg;base64,${atualPlayer}`} alt="" /></div>
                    )}

                </main>
                )}
            </MenuPrincipal>
        </AuthContent>
    )
}