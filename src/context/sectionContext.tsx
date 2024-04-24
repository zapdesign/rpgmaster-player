import { axiosInstance } from "@/services/axiosInstance";
import { useSectionStore } from "@/store/section"; 
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { URL } from "../services/baseURL";

export default function SectionContext({children}: {children: React.ReactNode}){

    const { section, actions: { addSection } } = useSectionStore()

    const [ existPage, setExistPage ] = useState(true)

    const router = useRouter();
    const { projectId } = router.query;

    const seachProject = async () => {
        if(projectId){
            try{  
    
                const response = await axios.get(`${URL}/player/${projectId}`)
                addSection(response.data)
    
            }catch(err: any){
    
                console.log(err)
                setExistPage(false)
            }                
        }
    }
 

    const { data, isLoading, isError } = useQuery('project', async () => {
        seachProject()        
    },{
        enabled: !!projectId 
    })

    if(isLoading){
        return <h1>loading</h1>
    }

    if(!existPage){
        return (
            <main style={{height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection:'column', gap: '25px'}}>
                <h1>Essa sessão não existe..</h1>
            </main> 
        )
    }

    return (
        <>
            {section[0] !== undefined && children}
        </>
        )
}




