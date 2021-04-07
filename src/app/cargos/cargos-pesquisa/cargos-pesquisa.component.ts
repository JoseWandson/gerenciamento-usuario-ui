import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Table } from 'primeng/table';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';

import { CargoService } from './../cargo.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-cargos-pesquisa',
  templateUrl: './cargos-pesquisa.component.html',
  styleUrls: ['./cargos-pesquisa.component.css']
})
export class CargosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  cargos = [];

  @ViewChild('tabela', { static: true })
  grid!: Table;

  constructor(
    private cargoService: CargoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de cargos');
  }

  listar(pagina = 0): void {
    this.cargoService.listar(pagina)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.cargos = resultado.cargos;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent): void {
    const pagina = event.first && event.rows ? (event.first / event.rows) : 0;
    this.listar(pagina);
  }

  confirmarExclusao(cargo: any): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => this.excluir(cargo)
    });
  }

  private excluir(cargo: any): void {
    this.cargoService.excluir(cargo.codigo)
      .then(() => {
        this.grid.reset();

        this.messageService.add({ severity: 'success', detail: 'Cargo excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
