import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrearUsuarioDTO, LitarUsuarioDTO, LoginUsuarioDTO, RecuperarPasswordDTO, UsuarioDTO } from '../usuario/usuario.model';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiURL=environment.apiURL+'/auth';
  private _refresh$ = new Subject<void>();
  constructor(public http: HttpClient, private router: Router) {
  }

  public obtenerTodos():Observable<any>{
    return this.http.get<LitarUsuarioDTO[]>(`${this.apiURL}/users`);
  }


  /*checkServerStatus() {
    this.http.get<LitarUsuarioDTO[]>(`${this.apiURL}/users`)
      .subscribe(
        data => {
          return console.log('Server is up and running')},
        error => {
          return console.log('Server is down');
          // Handle error
        }
      );
  }*/



  public crear(usuario: CrearUsuarioDTO) {
    return this.http.post<boolean>(`${this.apiURL}/register/`, usuario)  //envia el contenido del form al backend (web api)
    .pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }

  public editar(id: number, usuario: CrearUsuarioDTO){
    console.log('ID:'+id);
    return this.http.put(`${this.apiURL}/users/${id}`, usuario).pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public eliminarPorId(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiURL}/users/${id}`).pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public obtenerUsuarioPorId(id: number):Observable<any>{
    return this.http.get<UsuarioDTO>(`${this.apiURL}/users/${id}`);
  }
  //observables
  get refresh$(){
    return this._refresh$;
  }
}
