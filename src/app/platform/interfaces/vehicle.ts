export interface Pendiente {
  id: number;
  titulo: string;
  pendiente: boolean;
  vencimiento: number;
}

export interface documents {
  id: number;
  vehiculo_id: number;
  tipo_documento: string;
  fecha_vencimiento: string;
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
  averiado: boolean;
  pendientes: Pendiente[];
  usuario_en_uso:string;
  documentos:documents[];
  kilometraje: string;
  imei: string;
}
