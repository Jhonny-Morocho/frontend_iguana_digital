  export interface CrearUsuarioDTO{
    departamento_id: number;
    nombre: string;
    apellido: string;
    usuario:string;
    email: string;
}

export interface LitarUsuarioDTO{
  id: number ;
  departamento_id:number;
  nombre: string;
  apellido: string;
  usuario: string;
  email: string;
  created_at: string;
  updated_at: string;
  departamento:DepartamentoDTO
}
export interface DepartamentoDTO{
  id: number,
  nombre: string,
  created_at:string,
  updated_at:string
}
export interface UsuarioDTO{
  id: number ;
  departamento_id:number;
  nombre: string;
  apellido: string;
  usuario: string;
  email: string;
  created_at: string;
  updated_at: string;
  departamento:DepartamentoDTO
}
 export interface RecuperarPasswordDTO{
    email: string;
 }
export interface FormUsuarioDTO{
  departamento_id:number;
  nombre: string;
  apellido: string;
  usuario: string;
  email: string;
}

export interface obtenerUsuarioDTO{
  id: number ;
  departamento_id:number;
  nombre: string;
  apellido: string;
  usuario: string;
  email: string;
  created_at: string;
  updated_at: string;
  departamento:DepartamentoDTO
}



