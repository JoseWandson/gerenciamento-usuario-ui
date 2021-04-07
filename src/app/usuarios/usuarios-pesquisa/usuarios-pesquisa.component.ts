import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Table } from 'primeng/table';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';

import { UsuarioService } from '../usuario.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-usuarios-pesquisa',
  templateUrl: './usuarios-pesquisa.component.html',
  styleUrls: ['./usuarios-pesquisa.component.css']
})
export class UsuariosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  usuarios = [];

  @ViewChild('tabela', { static: true })
  grid!: Table;

  constructor(
    private usuarioService: UsuarioService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de usuários');
  }

  listar(pagina = 0): void {
    this.usuarioService.listar(pagina)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.usuarios = resultado.usuarios;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent): void {
    const pagina = event.first && event.rows ? (event.first / event.rows) : 0;
    this.listar(pagina);
  }

  confirmarExclusao(usuario: any): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => this.excluir(usuario)
    });
  }

  private excluir(usuario: any): void {
    this.usuarioService.excluir(usuario.codigo)
      .then(() => {
        this.grid.reset();

        this.messageService.add({ severity: 'success', detail: 'Usuário excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
