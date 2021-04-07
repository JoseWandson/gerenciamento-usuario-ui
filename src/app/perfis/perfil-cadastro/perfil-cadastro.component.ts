import { Perfil } from '../../core/model';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { PerfilService } from '../perfil.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-perfil-cadastro',
  templateUrl: './perfil-cadastro.component.html',
  styleUrls: ['./perfil-cadastro.component.css']
})
export class PerfilCadastroComponent implements OnInit {

  perfil = new Perfil();

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private perfilService: PerfilService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Novo perfil');

    const codigoPerfil = this.route.snapshot.params.codigo;
    if (codigoPerfil) {
      this.carregarPerfil(codigoPerfil);
    }
  }

  salvar(): void {
    if (this.editando) {
      this.atualizarPerfil();
    } else {
      this.adicionarPerfil();
    }
  }

  novo(form: NgForm): void {
    form.reset();

    setTimeout(() => this.perfil = new Perfil(), 1);

    this.router.navigate(['/perfis/novo']);
  }

  get editando(): boolean {
    return Boolean(this.perfil.codigo);
  }

  private carregarPerfil(codigo: number): void {
    this.perfilService.buscarPorCodigo(codigo)
      .then(perfil => {
        this.perfil = perfil;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  private adicionarPerfil(): void {
    this.perfilService.adicionar(this.perfil)
      .then(perfilAdicionado => {
        this.messageService.add({ severity: 'success', detail: 'Perfil adicionado com sucesso!' });

        this.router.navigate(['/perfis', perfilAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  private atualizarPerfil(): void {
    this.perfilService.atualizar(this.perfil)
      .then(perfil => {
        this.perfil = perfil;

        this.messageService.add({ severity: 'success', detail: 'Perfil alterado com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  private atualizarTituloEdicao(): void {
    this.title.setTitle(`Edição de perfil: ${this.perfil.nome}`);
  }

}
