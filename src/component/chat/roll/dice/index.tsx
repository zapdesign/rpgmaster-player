import styles from './dice.module.css'


export default function Dice({number, click}: any){


    return (
        <div className={styles.hex} onClick={click}>
            <p className={styles.valorRolagem}>{number}</p>
        </div>
    )
}