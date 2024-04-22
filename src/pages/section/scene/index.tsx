import MenuPrincipal from "@/component/menu";
import AuthContent from "@/context/AuthContext";
import { axiosInstance } from "@/services/axiosInstance";
import { useCaracterStore } from "@/store/caracter";
import { useUsersStore } from "@/store/users/Index";
import { useQuery } from "react-query";


export default function Scenes() {

    

    return (
        <AuthContent>
            <MenuPrincipal>
                <h1>Cenas</h1>
            </MenuPrincipal>
        </AuthContent>
    )
}