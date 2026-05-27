export interface EncuestaModel {

    id?: number,
    id_usuario?:string,
    nombre: string,
    apellido: string,
    edad: number,
    telefono: string,
    juegos: string,
    opinion: string,
    satifaccion: string
    created_at?: Date

}

export interface EncuestaSelect extends EncuestaModel{

    usuario?: {
        email: string;
    }

}