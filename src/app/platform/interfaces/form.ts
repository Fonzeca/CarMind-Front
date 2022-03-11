export interface formInterface {
  id: number;
  titulo: string;
}


export interface Pregunta {
  descripcion: string;
  index?: number;
  tipo: string;
  opciones: string[];
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
