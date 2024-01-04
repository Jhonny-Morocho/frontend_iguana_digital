  export interface CrearUsuarioDTO{
    username:string;
    email: string;
    password: string;
    password2: string;
    is_staff: boolean;
}

export interface LitarUsuarioDTO{
  id: number ;
  departamento_id:number;
  nombre: string;
  apellido: string;
  usuario: string;
  email: string;
}
export interface UsuarioDTO{
  id: number ;
  username:string;
  email: string;
  is_staff: boolean;
}
 export interface RecuperarPasswordDTO{
    email: string;
 }
export interface EditUsuarioDTO{
  id: number ;
  username:string;
  email: string;
  password: string;
  password2: string;
  is_staff: boolean;
}

export interface obtenerUsuarioDTO{
  id: number;
  username:string;
  email: string;
  is_staff: boolean;
}

export interface LoginUsuarioDTO{
  username: string;
  password:string;
}

