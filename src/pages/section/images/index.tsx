import MenuPrincipal from "@/component/menu";
import styles from "./images.module.css"
import { FaRegFileImage } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/services/axiosInstance";
import PerImage from "@/component/imagesComp/perImage";
import AuthContent from "@/context/AuthContext";
import { useUsersStore } from "@/store/users/Index";
import { useQuery } from "react-query";
import ImageActive from "@/component/imagesComp/active";

export interface MasterImage{
    id: string
    name: string
    type: string
    image_name: string
    project_id: string
    player_visible: string 
    created_at: string
}


export default function ImagesMaster(){

    const { users } = useUsersStore()

    const [ project, setProject ] = useState('')

    const [ typeImage, setTypeImage ] = useState("")
    const [ imagesPerType, setImagesPerType ] = useState<MasterImage[]>([])

    const [ modalImagem, setModalImagem ] = useState(false)
    const [ imagemGrande, setImagemGrande ] = useState("")

    const [ modal, setModal ] = useState(false)

    const getImageType = async (type: string) => {
        if(type === ""){
            return
        }
        try{
            const response = await axiosInstance(`images/player-image-project/${users[0].project_id}/${type}`)
            const data = await response.data
            setImagesPerType(data)
        }catch(err){
            console.error(err)
        }
    }

    const openImage = async (image: string) => {
        setModalImagem(true)
        setImagemGrande(image)
    }


    return (
        <AuthContent>
            <MenuPrincipal>
                <main className={styles.main} style={{flexGrow: 1}}>

                    <div className={styles.headerImageJust}>
                        <div className={styles.headerImage}>
                            <p className={`${styles.headerText} ${typeImage === "atual" ? styles.choose : styles.att}`} onClick={() => {
                                setImagesPerType([])
                                setTypeImage("atual")
                            }}>Atual</p>
                            <p className={`${styles.headerText} ${typeImage === "lugares" ? styles.choose : styles.att}`} onClick={() => {
                                getImageType("lugares")
                                setTypeImage("lugares")
                            }}>Lugares</p>
                            <p className={`${styles.headerText} ${typeImage === "pessoas" ? styles.choose : styles.att}`} onClick={() => {
                                getImageType("pessoas")
                                setTypeImage("pessoas")
                            }}>Pessoas</p>
                            <p className={`${styles.headerText} ${typeImage === "criaturas" ? styles.choose : styles.att}`} onClick={() => {
                                getImageType("criaturas")
                                setTypeImage("criaturas")
                            }}>Criaturas</p>
                            <p className={`${styles.headerText} ${typeImage === "mapa" ? styles.choose : styles.att}`} onClick={() => {
                                getImageType("mapa")
                                setTypeImage("mapa")
                            }}>Mapa</p>
                        </div>

                    </div>

                    <div className={styles.backgroundImage}>
                        {imagesPerType[0] !== undefined ? (imagesPerType.map((cada, index) => (
                            <div key={cada.id} className={styles.ImageBlock}>
                                <PerImage cada={cada} setModal={setModal} modal={modal} openImage={openImage}></PerImage>
                            </div>
                        ))
                        ) : typeImage === "atual" && users[0] !== undefined ? (
                            <ImageActive users={users}></ImageActive>
                        ) : (
                            <p>Nenhuma imagem encontrada</p>
                        )}
                    </div>
                    {modalImagem && <div className={styles.fundoImagemGrande} onClick={() => setModalImagem(false)}><img src={imagemGrande} className={styles.imagemGrande} alt="Image em grande tamanho" /></div>}
                </main>
            </MenuPrincipal>
        </AuthContent>
    )
}