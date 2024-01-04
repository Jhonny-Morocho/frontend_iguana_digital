import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DepartamentoDTO } from '../usuario/dto_usuario/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {
  private apiURL=environment.apiURL;
  constructor(public http: HttpClient) { }
  
  public obtenerTodos():Observable<any>{
    return this.http.get<DepartamentoDTO[]>(`${this.apiURL}/departaments`);
  }
}
