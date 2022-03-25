export interface formInterface {
  id: number;
  titulo: string;
}


export interface Pregunta {
  descripcion: string;
  crucial?: boolean;
  tipo: string;
  opciones: Opciones[];
}

export interface Opciones {
  opcion: string;
  crucial?: boolean;
}

export interface Seccion {
  nombre: string;
  index?: number;
  preguntas: Pregunta[];
}

export interface FormCreate {
  titulo: string;
  fecha_inicio: string;
  secciones: Seccion[];
}
