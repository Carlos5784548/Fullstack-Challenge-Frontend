export interface Task {
  id?: string;
  titulo: string;
  descripcion?: string;
   fecha_limite?: string;
  estado: 'pendiente' | 'en progreso' | 'completada';
}