import { useState } from 'react'
import styles from './ladoDireto.module.css'
import { useCaracterStore } from '@/store/caracter'
import { axiosInstance } from '@/services/axiosInstance'
import { useQuery } from 'react-query'
const MAX_FILE_SIZE = 1 * 1024 * 1024;

export default function LadoDireito({ changePlayer, newCaracter, setNewCaracter }: any) {

    const { caracter } = useCaracterStore()

    const [ imagePlayer, setImagePlayer ] = useState("")

    const changeBoxApi = async (data: any) => {

        try {

            await axiosInstance.patch(`player/caracter/${caracter[0].id}`, {
                ...data
            })

        } catch (err) {
            console.error(err)
        }
    }

    const enviarArquivo = async (arquivo: any) => {
        const formData = new FormData();
        formData.append('file', arquivo);
      
        try {
          const resposta = await axiosInstance.post(`/upload/player/${caracter[0].id}`, formData);
          getImage()
        } catch (erro) {
          console.error('Erro ao enviar o arquivo:', erro);
        }
    };

    const dellImage = async (arquivo: any) => {
        
        try {
            const resposta = await axiosInstance.delete(`/upload/player/${caracter[0].id}`)
            enviarArquivo(arquivo)

            return
        } catch (erro) {
            console.error('Erro ao deletar a imagem', erro);
        }

    }

    const handleFileChange = (evento: any) => {
        const arquivo = evento.target.files[0];
        if (arquivo) {
            if (arquivo.size > MAX_FILE_SIZE) {
                alert('O tamanho do arquivo excede o limite permitido.');
                return
            }
          enviarArquivo(arquivo);
        }
    }

    const newImage = (evento: any) => {
        const arquivo = evento.target.files[0];
        if (arquivo) {
            if (arquivo.size > MAX_FILE_SIZE) {
                alert('O tamanho do arquivo excede o limite permitido.');
                return
            }
          dellImage(arquivo);
        }
    }



    const getImage = async () => {
        try{
            const novaResponse = await axiosInstance.get(`/upload/get/player-${caracter[0].id}`);
            const novaBase64Image = Buffer.from(novaResponse.data, 'binary').toString('base64');
            setImagePlayer(novaBase64Image)

        }catch(err){
            console.error(err)
        }
        
    };

    const changeCheckBox = (type: boolean, name: string) => {
        setNewCaracter({ ...newCaracter, [name]: type })
        changeBoxApi({ [name]: type })
        return
    };

    const { data, isLoading, isError } = useQuery('caracterImage', async () => {
        getImage()
        
    },{
        enabled: caracter[0] !== undefined
    })



    return (
        <div className={styles.fundoDireito}>
            {caracter[0] !== undefined && (
                <div className={styles.fundoFoto}>
                    {imagePlayer ? (
                        <div className={styles.fundoFoto}>
                            <img height="100%"  width="100%" className={styles.imagePlayer} onClick={() => document.getElementById('file-upload').click()} src={`data:image/jpeg;base64,${imagePlayer}`}></img>
                            <input type="file" id="file-upload"  style={{cursor: 'pointer', display: "none"}} accept="image/png, image/jpeg" onChange={newImage}/>
                        </div>
                    ): (
                        <input type="file" style={{cursor: 'pointer'}} accept="image/png, image/jpeg" onChange={handleFileChange}/>
                    )}
                </div>
            )}

            <div className={styles.fundoFlex}>
                <div className={styles.fundoLosanguloInicial}>
                    <p className={styles.textoPrincipal}>Pontos de <br></br>aventura</p>
                    <div className={styles.losanguloPequeno2}>
                        <input type="number" value={newCaracter.pontos_de_aventura} onChange={(e) => {
                            changePlayer()
                            setNewCaracter({ ...newCaracter, pontos_de_aventura: Number(e.target.value) })
                        }} className={styles.inputLosangulo} />
                    </div>
                </div>
                <div className={styles.fundoLosanguloInicial}>
                    <p className={styles.textoPrincipal}>Pontos de <br></br>perícia</p>
                    <div className={styles.losanguloPequeno2}>
                        <input type="number" value={newCaracter.pontos_de_pericia} onChange={(e) => {
                            changePlayer()
                            setNewCaracter({ ...newCaracter, pontos_de_pericia: Number(e.target.value) })
                        }} className={styles.inputLosangulo} />
                    </div>
                </div>
                <div className={styles.fundoLosanguloInicial}>
                    <p className={styles.textoPrincipal}>Pontos de <br></br>sociedade</p>
                    <div className={styles.losanguloPequeno2}>
                        <input type="number" value={newCaracter.pontos_de_sociedade} onChange={(e) => {
                            changePlayer()
                            setNewCaracter({ ...newCaracter, pontos_de_sociedade: Number(e.target.value) })
                        }} className={styles.inputLosangulo} />
                    </div>
                </div>
            </div>

            <div className={styles.fundoFlex}>
                <div className={styles.fundoColunm}>
                    <div>
                        <p className={styles.textoEsquerda}>Carga <br></br>atual</p>
                    </div>
                    <div className={styles.fundoLosanguloPoint}>
                        <div className={styles.ajeitarNA}>
                            <div className={styles.losanguloGrande}>
                                <input type="number" value={newCaracter.carga_atual} onChange={(e) => {
                                    changePlayer()
                                    setNewCaracter({ ...newCaracter, carga_atual: Number(e.target.value) })
                                }} className={styles.inputLosangulo} style={{ fontSize: '35px' }} />
                            </div>
                        </div>
                        <div className={styles.ajeitarCima}>
                            <div className={styles.losanguloPequeno} >
                                <input type="number" value={newCaracter.carga} onChange={(e) => {
                                    changePlayer()
                                    setNewCaracter({ ...newCaracter, carga: Number(e.target.value) })
                                }} className={styles.inputLosanguloPequeno} />
                            </div>
                            <p className={styles.textosMenores}>Carga</p>
                        </div>
                        <div className={styles.ajeitarBaixo}>
                            <div className={styles.losanguloPequeno}>
                                <input type="number" value={newCaracter.fadiga} onChange={(e) => {
                                    changePlayer()
                                    setNewCaracter({ ...newCaracter, fadiga: Number(e.target.value) })
                                }} className={styles.inputLosanguloPequeno} />
                            </div>
                            <p className={styles.textosMenores}>Fadiga</p>
                        </div>
                    </div>
                </div>
                <div className={styles.fundoColunm}>
                    <div>
                        <p className={styles.textoEsquerda}>Esperança <br></br>atual</p>
                    </div>
                    <div className={styles.fundoLosanguloPoint}>
                        <div className={styles.ajeitarNA}>
                            <div className={styles.losanguloGrande}>
                                <input type="text" value={newCaracter.esperanca_atual} onKeyDown={changePlayer} onChange={(e) => setNewCaracter({ ...newCaracter, esperanca_atual: Number(e.target.value) })} className={styles.inputLosangulo} style={{ fontSize: '35px' }} />
                            </div>
                        </div>
                        <div className={styles.ajeitarCima}>
                            <div className={styles.losanguloPequeno} >
                                <input type="text" value={newCaracter.sombra} onKeyDown={changePlayer} onChange={(e) => setNewCaracter({ ...newCaracter, sombra: Number(e.target.value) })} className={styles.inputLosanguloPequeno} />
                            </div>
                            <p className={styles.textosMenores}>Sombra</p>
                        </div>
                        <div className={styles.ajeitarBaixo}>
                            <div className={styles.losanguloPequeno}>
                                <input type="text" value={newCaracter.cicatrizes_sombra} onKeyDown={changePlayer} onChange={(e) => setNewCaracter({ ...newCaracter, cicatrizes_sombra: Number(e.target.value) })} className={styles.inputLosanguloPequeno} />
                            </div>
                            <p className={styles.textosMenores}>Cicatrizes <br></br> de sombra</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.barra}></div>

            <div className={styles.organizarCondicoes}>
                <p className={styles.textoPrincipal}>Condições</p>

                <div className={styles.fundoFlex} style={{ gap: '30px' }}>
                    <div>
                        <div className={styles.fundoFlex} style={{ gap: '10px' }}>
                            <input type="checkbox" checked={newCaracter.exausto} />
                            <p>Exausto</p>
                        </div>
                        <div className={styles.fundoFlex} style={{ gap: '10px' }}>
                            <input type="checkbox" checked={newCaracter.arrasado} />
                            <p>Arrasado</p>
                        </div>
                        <div className={styles.fundoFlex} style={{ gap: '10px' }}>
                            <input type="checkbox" checked={newCaracter.ferido} onChange={(e) => changeCheckBox(e.target.checked, 'ferido')} />
                            <p>Ferido</p>
                        </div>
                    </div>

                    <div className={styles.ferimento}>
                        <p>Ferimento</p>
                        <input type="text" name='ferimento' placeholder='Digite aqui...' value={newCaracter.ferimento} onChange={(e) => {
                            changePlayer()
                            setNewCaracter({ ...newCaracter, ferimento: e.target.value })
                        }} className={styles.input} />
                    </div>
                </div>

            </div>

            <div className={styles.barra}></div>

            <div className={styles.organizarCondicoes} style={{ flex: '1 0 ' }}>
                <p className={styles.textoPrincipal}>Equipamento de Viagem</p>
                <textarea placeholder='Digite aqui...' value={newCaracter.equipamento_de_viagem} onChange={(e) => {
                    changePlayer()
                    setNewCaracter({ ...newCaracter, equipamento_de_viagem: e.target.value })
                }} className={styles.inputRecompensa}></textarea>
            </div>
        </div>
    )
}