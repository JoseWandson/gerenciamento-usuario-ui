import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Table } from 'primeng/table';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';

import { PerfilService } from '../perfil.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-perfis-pesquisa',
  templateUrl: './perfis-pesquisa.component.html',
  styleUrls: ['./perfis-pesquisa.component.css']
})
export class PerfisPesquisaComponent implements OnInit {

  totalRegistros = 0;
  perfis = [];

  @ViewChild('tabela', { static: true })
  grid!: Table;

  constructor(
    private perfilService: PerfilService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de perfis');
  }

  listar(pagina = 0): void {
    this.perfilService.listar(pagina)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.perfis = resultado.perfis;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent): void {
    const pagina = event.first && event.rows ? (event.first / event.rows) : 0;
    this.listar(pagina);
  }

  confirmarExclusao(perfil: any): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => this.excluir(perfil)
    });
  }

  private excluir(perfil: any): void {
    this.perfilService.excluir(perfil.codigo)
      .then(() => {
        this.grid.reset();

        this.messageService.add({ severity: 'success', detail: 'Perfil excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
