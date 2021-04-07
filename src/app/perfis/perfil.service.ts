import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Perfil } from '../core/model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  perfisUrl: string;

  constructor(private http: HttpClient) {
    this.perfisUrl = `${environment.apiUrl}/perfis`;
  }

  async buscarPorCodigo(codigo: number): Promise<Perfil> {
    return await this.http.get<Perfil>(`${this.perfisUrl}/${codigo}`)
      .toPromise();
  }

  adicionar(perfil: Perfil): Promise<Perfil> {
    delete perfil.codigo;

    return this.http.post<Perfil>(this.perfisUrl, perfil)
      .toPromise();
  }

  async atualizar(perfil: Perfil): Promise<Perfil> {
    const codigo = perfil.codigo;
    delete perfil.codigo;

    return await this.http.put<Perfil>(`${this.perfisUrl}/${codigo}`, perfil)
      .toPromise();
  }

  async listar(pagina: number): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', pagina.toString());
    params = params.set('size', '5');
    params = params.set('sort', 'nome,asc');

    const response = await this.http.get<any>(this.perfisUrl, { params }).toPromise();
    const perfis = response.content;
    const resultado = {
      perfis,
      total: response.totalElements
    };
    return resultado;
  }

  async excluir(codigo: number): Promise<void> {
    await this.http.delete(`${this.perfisUrl}/${codigo}`).toPromise();
  }

  async listarTodos(): Promise<any> {
    const response = await this.http.get<any>(this.perfisUrl).toPromise();
    return response.content;
  }
}
