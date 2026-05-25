export interface juegoInterfaceInsert {
    id?: number
    juego: string,
    letras?: number,
    aciertos?: number,
    tiempo?: number,
    created_at?: Date,
    id_usuario?: string,
}

export interface juegoInterfaceSelect extends juegoInterfaceInsert {

    usuarios ?: {
        email: string;
    };
}