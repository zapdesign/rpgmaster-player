import { useEffect, useRef, useState } from 'react';
import styles from './chat.module.css'
import { IoChatbubblesOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { FaDiceSix } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { URL } from '@/services/baseURL';
import { io } from 'socket.io-client';
import { useUsersStore } from '@/store/users/Index';
import { token } from '@/services/takeToken';
import { v4 as uuidv4 } from 'uuid';
import { axiosInstance } from '@/services/axiosInstance';
import RollChoice from './roll';
import Rolling from './roll/rollling';
import { useCaracterStore } from '@/store/caracter';
import ImageChat from './imageChat';

interface Message {
    id: string
    name: string
    text: string
    player_id: string
    isMine: boolean

}

interface Payload {
    id?: string
    name: string
    text: string
    player_id: string
    room: string
}

const socket = io(URL, {
    auth: {
        token: token
    }
})

function rollDice(text: any) {
    const diceRegex = /(\d+)d(\d+)/g;
    const matches = [...text.matchAll(diceRegex)];
    let total = 0;
    const rolls: any = [];

    matches.forEach(match => {
        const numberOfDice = parseInt(match[1]);
        const diceType = parseInt(match[2]);
        const diceResults = [];

        for (let i = 0; i < numberOfDice; i++) {
            let roll: any = Math.floor(Math.random() * diceType) + 1;
            if (diceType === 12 && roll === 12) {
                roll = "Gandalf";
            } else if (diceType === 12 && roll === 11) {
                roll = "Sauron";
            }
            diceResults.push(roll);
            if (typeof roll === "number") {
                total += roll;
            }
        }

        rolls.push({
            expression: match[0],
            results: diceResults
        });
    });

    return { total, rolls };
}
export default function Chat({users}: any) {

    const containerRef = useRef<HTMLDivElement>(null);

    const handleRollDice = (text: string) => {
        return new Promise((resolve, reject) => {
            const regex = /\b(\d+)d(\d+)\b/g;

            const isValidInput = regex.test(text);
            if (!isValidInput) {
                resolve('');
                return;
            }

            const matches = text.match(regex);
            let isValid = true;

            if (matches) {
                matches.forEach(match => {
                    const numberOfDice = parseInt(match.split('d')[0]);
                    if (numberOfDice > 7) {
                        isValid = false;
                    }
                });
            }

            const regexD12 = /\b(2d12|\d+d6)\s*\+\s*\d+d6\b|\b\d+d6\s*\+\s*(2d12|\d+d6)\b/g
            const tem1d12 = text.match(regexD12);   
            if(tem1d12) {
                isValid = false
            }

            if (isValid) {
                const { total, rolls } = rollDice(text);
                let resultText = '';

                rolls.forEach((roll: any) => {
                    resultText += `${roll.expression}: ${roll.results.join(', ')}\n`;
                });

                resultText += '\n';

                resolve(`Resultados:\n${resultText}Soma total: ${total}`);
                return
            }

            if(!isValid){
                let d12Results: number[] = [];
                let d6Results: number[] = [];
                
                if (tem1d12) {
                    // Roll 2d12
                    d12Results = Array.from({ length: 2 }, () => Math.floor(Math.random() * 12) + 1);
        
                    tem1d12.forEach(match => {
                        // Extract the number of d6 dice
                        const d6Match = match.match(/\d+d6/);
                        if (d6Match) {
                            const numDice = parseInt(d6Match[0]);
                            // Roll d6 dice
                            d6Results = d6Results.concat(Array.from({ length: numDice }, () => Math.floor(Math.random() * 6) + 1));
                        }
                    });
                }
        
                // Calculate the two final results
                const maxD12 = Math.max(...d12Results);
                const minD12 = Math.min(...d12Results);
                const F = maxD12 + d6Results.reduce((acc, curr) => acc + curr, 0);
                const D = minD12 + d6Results.reduce((acc, curr) => acc + curr, 0);
        
                // Format the output text
                let resultText = 'Resultados:\n';
                resultText += `d12: ${d12Results.join(', ')}\n`;
                if (d6Results.length > 0) {
                    resultText += `d6: ${d6Results.join(', ')}\n\n`;
                }
                resultText += `F: ${F}\n`;
                resultText += `D: ${D}`;
                console.log(resultText)
                resolve(resultText);
            }

            
        })
    } 

    const [ hasMessage, setHasMessage ] = useState(false)

    const [roll, setRoll] = useState('')
    const [rollResult, setRollResult] = useState('')

    const { caracter } = useCaracterStore()

    const [isVisible, setIsVisible] = useState(false);

    const [text, setText] = useState('')

    const [msg, setMsg] = useState<Message[]>([])

    function scroll() {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }
 
    useEffect(() => {
        async function receivedMessage(message: Payload) {
            setMsg(prevMsg => [
                ...prevMsg,
                {
                    id: uuidv4(),
                    name: message.name,
                    text: message.text,
                    player_id: message.player_id,
                    isMine: message.player_id === caracter[0].id
                }
            ]);
            await new Promise(resolve => setTimeout(resolve, 10));
            setHasMessage(true)
            scroll()
        }
        
        async function joinChatRoom() {
            if (users[0].project_id) {
                socket.emit('joinRoom', users[0].project_id);
                getOldMessages()
            } else {
            }
        }
    
        async function setupSocket() {
            socket.connect();
    
            socket.on('msgToClient', receivedMessage);
    
            socket.on('connect', joinChatRoom);
        }
    
        setupSocket();
    
        return () => {
            socket.disconnect();
            socket.off('msgToClient', receivedMessage);
            socket.off('connect', joinChatRoom);
        };
    }, [socket, users]);


    const getOldMessages = async () => {

        try {

            const response = await axiosInstance.get(`/chat/${users[0].project_id}`)
            const data = await response.data
            const novo = data.map((cada: Payload) => ({
                id: cada.id,
                name: cada.name,
                text: cada.text,
                player_id: cada.player_id,
                isMine: cada.player_id === caracter[0].id
            }))
            setMsg(novo)

        } catch (err) {
            console.error(err)
        }
    } 

    function enterMessage(event: any) {  
        if (event.key === "Enter") {
            event.preventDefault()
            sendMessage()
        }
    }

    async function sendMessage() {

        if (text !== "") {

            let message: Payload = {
                name: users[0].name,
                player_id: caracter[0].id,
                text,
                room: users[0].project_id
            };

            const rolagem = await handleRollDice(message.text)
            if (rolagem) {
                message.text = ` ~-${caracter[0].name}-~\n${rolagem}`
                message.name = 'RPGMaster'
                message.player_id = "01"
            }
            socket.emit('msgToServer', message); 
            setText('');
        }
    }

    function getFirstLetter(name: string) {
        return name.charAt(0).toUpperCase();
    }

    
    const [rollChoiceOn, setRollChoiceOn] = useState(false)

    const [rollTestOn, setRollTestOn] = useState(false)
    const [choice, setChoice] = useState<{
        id: number;
        nome_normal: string;
        nome_simples: string;
    }[]>([])
    const [rolling, setRolling] = useState(false)
    const [test, setTest] = useState('')

    const [result, setResult] = useState({
        d12: 0,
        d6: 0
    })

    return (
        <>
            {!isVisible && (
                <button className={styles.botaoAbrir} onClick={() => {
                    setIsVisible(true)
                    scroll()
                    setHasMessage(false)
                }
                }>
                    <IoChatbubblesOutline />
                    {hasMessage && <div className={styles.newMessage}></div>}
                </button>
            )}

            <div className={`${styles.chatContainer} ${isVisible ? styles.visible : ''}`}>

                <div className={styles.headerChat}>
                    <IoMdClose onClick={() => {
                        setIsVisible(false)
                        setHasMessage(false)
                    }} style={{ cursor: 'pointer' }}></IoMdClose>
                    <p className={styles.textoPrincipal}>Chat Geral</p>
                    <div></div>
                </div>

                <div className={styles.fundoHistorico} ref={containerRef}>
                    {msg && msg.map((cada: Message) => (
                        <div key={cada.id} className={`${cada.isMine ? styles.alignRight : styles.alignLeft}`}>
                            {cada.isMine ? (
                                <div className={styles.fundoBubble}>
                                    <p className={styles.msgText}>{cada.text}</p>
                                </div>
                            ) : (
                                <>
                                    <div className={styles.fundoFotoChat}>
                                        <ImageChat cada={cada}></ImageChat>
                                    </div>
                                    <div className={styles.fundoBubble}>
                                        <p className={styles.msgText}>{cada.text}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {rolling && <Rolling test={test} setRolling={setRolling} result={result} setResult={setResult} ></Rolling>}

                {rollChoiceOn && <RollChoice rollTestOn={rollTestOn} setRollTestOn={setRollTestOn} choice={choice} setChoice={setChoice} setTest={setTest} setRolling={setRolling}></RollChoice>}
 
                <div className={styles.fundoDigitar}>
                    <div className={styles.fundoTexto}>
                        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder='Escreva aqui...' onKeyDown={enterMessage} className={styles.inputMsg}></textarea>
                    </div>

                    <div className={styles.fundoIcon}>
                        {/* <FaDiceSix className={styles.icons} onClick={() => {
                            setRollChoiceOn(!rollChoiceOn)
                            setChoice([])
                            setRollTestOn(false)
                        }} /> */}
                        <IoIosSend className={styles.icons} onClick={sendMessage} />
                    </div>
                </div>
            </div>
        </>
    )
}