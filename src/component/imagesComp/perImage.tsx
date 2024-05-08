import { axiosInstance } from "@/services/axiosInstance";
import styles from "./perImage.module.css"
import { useEffect, useState } from "react";
import { MdMore } from "react-icons/md";



export default function PerImage({cada, setGrandImage, setModal, openImage}: any) {

    const [image, setImage ] = useState(cada.name)

    

    const getImage = async () => {
        try{
            const response = await axiosInstance(`upload/get/${cada.image_name}`)
            setImage(response.data)
        }catch(err){
            console.error(err)
        }
    }

    useEffect(() => {
        getImage()
    },[])

    return (
        <>
            <img width="100%" height="150px" className={`${styles.image}`} onClick={() => {
                if(cada.name === image) return
                openImage(`${image}`)
            }} src={`${image}`}/>
            <div className={styles.fundoName}>
                <p>{cada.name}</p>

            </div>
            
        </>
    )
}