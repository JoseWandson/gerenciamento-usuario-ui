import { Cargo } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { CargoService } from '../cargo.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-cargo-cadastro',
  templateUrl: './cargo-cadastro.component.html',
  styleUrls: ['./cargo-cadastro.component.css']
})
export class CargoCadastroComponent implements OnInit {

  cargo = new Cargo();

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private cargoService: CargoService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Novo cargo');

    const codigoCargo = this.route.snapshot.params.codigo;
    if (codigoCargo) {
      this.carregarCargo(codigoCargo);
    }
  }

  salvar(): void {
    if (this.editando) {
      this.atualizarCargo();
    } else {
      this.adicionarCargo();
    }
  }

  novo(form: NgForm): void {
    form.reset();

    setTimeout(() => this.cargo = new Cargo(), 1);

    this.router.navigate(['/cargos/novo']);
  }

  get editando(): boolean {
    return Boolean(this.cargo.codigo);
  }

  private carregarCargo(codigo: number): void {
    this.cargoService.buscarPorCodigo(codigo)
      .then(cargo => {
        this.cargo = cargo;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  private adicionarCargo(): void {
    this.cargoService.adicionar(this.cargo)
      .then(cargoAdicionado => {
        this.messageService.add({ severity: 'success', detail: 'Cargo adicionado com sucesso!' });

        this.router.navigate(['/cargos', cargoAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  private atualizarCargo(): void {
    this.cargoService.atualizar(this.cargo)
      .then(cargo => {
        this.cargo = cargo;

        this.messageService.add({ severity: 'success', detail: 'Cargo alterado com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  private atualizarTituloEdicao(): void {
    this.title.setTitle(`Edição de cargo: ${this.cargo.nome}`);
  }

}
