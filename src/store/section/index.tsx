import { create } from 'zustand'

type Section = {
    id_user: string,
    id: string,
    name: string,
    rodada: number
}

type ActionsProps = {
    addSection: (atualSection: Section) => void;
}

type SectionProps = {

    section: Section[],
    actions: ActionsProps
}


export const useSectionStore = create<SectionProps>((set) => ({
    section: [],
    actions: {
        addSection: (atualProject) =>
            set(() => ({
                section: [atualProject]
            }))
    }
}))