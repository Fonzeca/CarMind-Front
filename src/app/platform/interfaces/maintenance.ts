export interface Defect{
    id: number,
    fecha_creacion: Date,
    prioridad: number,
    defecto: string,
    nombre_ape_usuario: string, 
    vehiculo_id: number,
    vehiculo: string,
    estado: string
}

export interface Comentario{
    usuario: string,
    fecha: Date,
    tema: string,
    tema_id: number,
    mensaje: string, 
}

export interface CreateComentario{
    usuario_id: number,
    usuario: string,
    tema: string,
    tema_id: number,
    mensaje: string, 
}