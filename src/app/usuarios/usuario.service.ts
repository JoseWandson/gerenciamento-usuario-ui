import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Usuario } from '../core/model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuariosUrl: string;

  constructor(private http: HttpClient) {
    this.usuariosUrl = `${environment.apiUrl}/usuarios`;
  }

  async buscarPorCodigo(codigo: number): Promise<Usuario> {
    return await this.http.get<Usuario>(`${this.usuariosUrl}/${codigo}`)
      .toPromise();
  }

  adicionar(usuario: Usuario): Promise<Usuario> {
    delete usuario.codigo;

    return this.http.post<Usuario>(this.usuariosUrl, usuario)
      .toPromise();
  }

  async atualizar(usuario: Usuario): Promise<Usuario> {
    const codigo = usuario.codigo;
    delete usuario.codigo;

    return await this.http.put<Usuario>(`${this.usuariosUrl}/${codigo}`, usuario)
      .toPromise();
  }

  async listar(pagina: number): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', pagina.toString());
    params = params.set('size', '5');
    params = params.set('sort', 'nome,asc');

    const response = await this.http.get<any>(this.usuariosUrl, { params }).toPromise();
    const usuarios = response.content;
    const resultado = {
      usuarios,
      total: response.totalElements
    };
    return resultado;
  }

  async excluir(codigo: number): Promise<void> {
    await this.http.delete(`${this.usuariosUrl}/${codigo}`).toPromise();
  }
}
