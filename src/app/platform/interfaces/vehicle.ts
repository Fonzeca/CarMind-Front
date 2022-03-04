export interface Pendiente {
  id: number;
  titulo: string;
  pendiente: boolean;
  vencimiento: number;
}

export interface vehicle {
  id: number;
  nombre: string;
  en_uso: boolean;
  color: string;
  marca: string;
  modelo: string;
  linea: string;
  patente: string;
  tipo: string;
  pendientes: Pendiente[];
  usuario_en_uso:string
}
