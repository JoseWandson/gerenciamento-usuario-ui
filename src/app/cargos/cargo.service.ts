import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';
import { Cargo } from './../core/model';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  cargosUrl: string;

  constructor(private http: HttpClient) {
    this.cargosUrl = `${environment.apiUrl}/cargos`;
  }

  async buscarPorCodigo(codigo: number): Promise<Cargo> {
    return await this.http.get<Cargo>(`${this.cargosUrl}/${codigo}`)
      .toPromise();
  }

  adicionar(cargo: Cargo): Promise<Cargo> {
    delete cargo.codigo;

    return this.http.post<Cargo>(this.cargosUrl, cargo)
      .toPromise();
  }

  async atualizar(cargo: Cargo): Promise<Cargo> {
    const codigo = cargo.codigo;
    delete cargo.codigo;

    return await this.http.put<Cargo>(`${this.cargosUrl}/${codigo}`, cargo)
      .toPromise();
  }

  async listar(pagina: number): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', pagina.toString());
    params = params.set('size', '5');
    params = params.set('sort', 'nome,asc');

    const response = await this.http.get<any>(this.cargosUrl, { params }).toPromise();
    const cargos = response.content;
    const resultado = {
      cargos,
      total: response.totalElements
    };
    return resultado;
  }

  async listarTodos(): Promise<any> {
    const response = await this.http.get<any>(this.cargosUrl).toPromise();
    return response.content;
  }

  async excluir(codigo: number): Promise<void> {
    await this.http.delete(`${this.cargosUrl}/${codigo}`).toPromise();
  }
}
