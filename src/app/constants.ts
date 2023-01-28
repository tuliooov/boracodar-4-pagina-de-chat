export interface MessageType {
    type: string;
    date: Date;
    message: string;
    id: string;
}

export const initChat = {
    name: 'Cecilia',
    messages: [] as MessageType[],
}

export const DefaultAnswer = [
    "Tive uma ideia incrível para um projeto! 😍",
    "E se a gente fizesse um chat moderno e responsivo em apenas uma semana?",
    "Podemos criar esse chat e disponibilizar para a comunidade usar.",
    "Seria incrivel mesmooo...",
    "Fico feliz que gostou 😍",
    "Entao é isso, jaja chego ai pra gente começar, tchauuu... 😘"
]
