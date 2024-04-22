import { useCaracterStore } from '@/store/caracter'
import styles from './rollChoice.module.css'
import Dice from './dice'
import { useEffect, useState } from 'react'



export default function Rolling({ test, setRolling, result, setResult }: any) {



    const { caracter } = useCaracterStore()

    const [progretion, setProgretion] = useState({
        d12Test: true,
        d12Duple: caracter[0][test],
        d12Finished: false,
        d6test: false,
        d6Number: 0
    })

    const [dices, setDices] = useState({
        d12: {
            d1: 0,
            d2: 0
        },
        d6: [{}]
    })

    const initRoll = async () => {
        await new Promise(resolve => setTimeout(resolve, 500));

        await updateDice(`d12`, `d1`, 12, false);

        if (progretion.d12Duple) {
            await updateDice(`d12`, `d2`, 12, false);
        }

        setProgretion({ ...progretion, d12Finished: true })
    }

    const rollSix = async () => {

        const newD6 = []
        for (let i = 1; i <= caracter[0][`${test}_bool`]; i++) {
            newD6.push({ [`d${i}`]: 0 })
        }

        setDices({ ...dices, d6: newD6 })
        await new Promise(resolve => setTimeout(resolve, 500));

        for (let i = 0; i < caracter[0][`${test}_bool`]; i++) {
            await updateDice(`d6`, `d${i + 1}`, 6, true, i)
            console.log(dices)
        }

    }

    async function updateDice(type: any, test: any, max: number, array: boolean, index: number = 0) {

        return new Promise<void>((resolve, reject) => {
            var startTime = Date.now();

            function update() {
                var randomNumber = Math.floor(Math.random() * max) + 1;
                var elapsedTime = Date.now() - startTime;

                if (elapsedTime < 1000) {
                    if (!array) {
                        setDices(prevDices => ({
                            ...prevDices,
                            [type]: {
                                ...prevDices[type],
                                [test]: randomNumber
                            }
                        }));
                    }

                    if (array) {
                        const newData = { ...dices[type][index], [test]: randomNumber }; // Criar um novo objeto com a propriedade atualizada

                        setDices(prevDices => ({
                            ...prevDices,
                            [type]: prevDices[type].map((item, i) => {
                                if (i === index) {
                                    return newData; // Substituir o objeto no índice especificado pelo novo objeto
                                }
                                return item; // Retornar os outros objetos sem alterações
                            })
                        }));
                    }

                    setTimeout(update, 100);
                } else {
                    resolve();
                }
            }

            update();
        });
    }

    useEffect(() => {
        initRoll()
    }, [])


    return (
        <div className={styles.rolling}>
            {progretion.d12Test && (
                <div className={styles.dice}>
                    <Dice number={dices.d12.d1} click={() => {
                        if (!progretion.d12Finished) return
                        setResult({ ...result, d12: dices.d12.d1 })
                        setProgretion({ ...progretion, d12Test: false, d6test: true })
                        rollSix()
                    }}
                    ></Dice>

                    {progretion.d12Duple && (
                        <Dice number={dices.d12.d2} click={() => {
                            if (!progretion.d12Finished) return
                            setResult({ ...result, d12: dices.d12.d2 })
                            setProgretion({ ...progretion, d12Test: false, d6test: true })
                            rollSix()
                        }
                        }></Dice>
                    )}
                    <p onClick={() => {
                    }}>Escolha seu resultado</p>
                </div>
            )}

            {progretion.d6test && (
                <div className={styles.dice}>
                    {dices.d6.map((cada, i) => (
                        <div key={i}>
                            <Dice click={() => rollSix()} number={cada[`d${i + 1}`]}></Dice>
                        </div>
                    ))}
                    <button onClick={() => {
                        setRolling(false)
                    }}>Finalizar teste</button>
                </div>
            )}

        </div>
    )
}