import { URL } from "@/services/baseURL";
import { useUsersStore } from "@/store/users/Index";
import axios from "axios";
import { useQuery } from "react-query";
var cookieCutter = require('cookie-cutter');


export default function AuthContent({children}: {children: React.ReactNode}){

    const { users, actions: { addUser } } = useUsersStore()

    const { data, isLoading, isError } = useQuery('me', async () => {
        const token = cookieCutter.get('@access_token_player')

        
        if(token){
            if(users !== undefined){
                try{
                    
                    const response = await axios.get(`${URL}/me-player`, {
                        headers: {
                            "ngrok-skip-browser-warning": true,
                            Authorization: `Bearer ${token}`
                        }
                    })
                    addUser(response.data)
                    
                    
                }catch(err: any){
    
                    console.log(err)
    
                    cookieCutter.set('@access_token_player', '', { expires: new Date(0)})
                    window.location.reload()
                    
                }                
            }

        }
    })

    if(isLoading){
        return <h1>loading</h1>
    }

    return (
        <>
            {users[0] !== undefined && children}
            
        </>
        )
}




