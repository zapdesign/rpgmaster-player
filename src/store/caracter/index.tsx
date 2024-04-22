import { create } from 'zustand'

type Caracter = {
    id: string;
    name: string;
    image: string;
    player_id: string;
    
    cultura_heroica: string;
    idade: string;
    padrao_de_vida: string;
    bencao_cultural: string;
    patrono: string;
    chamado: string;
    caminho_das_sombras: string;
    tesouro: string;
    caracteristicas_notaveis: string;
    falhas: string;
    
    forca_na: number;
    forca_nivel: number;
    forca_resistencia: number;
    
    fascinio: boolean;
    fascinio_bool: number;
    atletismo: boolean;
    atletismo_bool: number;
    vigilancia: boolean;
    vigilancia_bool: number;
    cacada: boolean;
    cacada_bool: number;
    musica: boolean;
    musica_bool: number;
    oficio: boolean;
    oficio_bool: number;
    
    machados_bool: number;
    arcos_bool: number;
    lancas_bool: number;
    espadas_bool: number;
    
    coracao_na: number;
    coracao_nivel: number;
    coracao_resistencia: number;
    
    inducao: boolean;
    inducao_bool: number;
    viagem: boolean;
    viagem_bool: number;
    discernimento: boolean;
    discernimento_bool: number;
    cura: boolean;
    cura_bool: number;
    cortesia: boolean;
    cortesia_bool: number;
    batalha: boolean;
    batalha_bool: number;
    
    recompensa: string;
    recompensa_valor: number;
    
    astucia_na: number;
    astucia_nivel: number;
    astucia_resistencia: number;
    
    persuasao: boolean;
    persuasao_bool: number;
    furtividade: boolean;
    furtividade_bool: number;
    busca: boolean;
    busca_bool: number;
    exploracao: boolean;
    exploracao_bool: number;
    enigma: boolean;
    enigma_bool: number;
    historia: boolean;
    historia_bool: number;
    
    virtudes: string;
    virtudes_sabedoria: number;
    
    armadura: string;
    armadura_protecao: number;
    armadura_carga: number;
    
    elmo: string;
    elmo_protecao: number;
    elmo_carga: number;
    
    escudo: string;
    escudo_protecao: number;
    escudo_carga: number;
    
    pontos_de_aventura: number;
    pontos_de_pericia: number;
    pontos_de_sociedade: number;
    
    carga_atual: number;
    carga: number;
    fadiga: number;
    
    esperanca_atual: number;
    sombra: number;
    cicatrizes_sombra: number;
    
    ferimento: string;
    tempo_ferimento: number;
    
    exausto: boolean;
    arrasado: boolean;
    ferido: boolean;
    
    equipamento_de_viagem: string;
}

type ActionsProps = {
    addCaracter: (atualCaracter: Caracter) => void;
}

type CaracterProps = {

    caracter: Caracter[],
    actions: ActionsProps
}


export const useCaracterStore = create<CaracterProps>((set) => ({
    caracter: [],
    actions: {
        addCaracter: (atualCaracter) =>
            set(() => ({
                caracter: [atualCaracter]
            }))
    }
}))