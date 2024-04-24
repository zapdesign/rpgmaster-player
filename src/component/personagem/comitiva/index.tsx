import styles from "./comitiva.module.css"
import Companhia from "./companhia"
import Registro from "./registro"

export default function Comitiva({comitiva, setNewComitiva, setChanges}: any) {


    return (
        <div className={styles.align}>
            <Registro comitiva={comitiva} setNewComitiva={setNewComitiva} setChanges={setChanges}></Registro>
            <div className={styles.barraLateral}></div>
            <Companhia comitiva={comitiva} setNewComitiva={setNewComitiva} setChanges={setChanges}></Companhia>
            <div className={styles.barraLateral}></div>
            <div className={styles.registro}></div>
            <div className={styles.barraLateral}></div>
            <div className={styles.companhia}></div>
        </div>
    )
}