import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { UsuarioService } from '../usuario.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { CargoService } from 'src/app/cargos/cargo.service';
import { Cargo, Perfil, Sexo, Usuario } from '../../core/model';
import { PerfilService } from 'src/app/perfis/perfil.service';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit {

  usuario = new Usuario();
  cargos = [];
  perfis = [];

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private cargoService: CargoService,
    private perfilService: PerfilService
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Novo usuário');

    const codigoUsuario = this.route.snapshot.params.codigo;
    if (codigoUsuario) {
      this.carregarUsuario(codigoUsuario);
    }

    this.carregarCargos();
    this.carregarPerfis();
  }

  salvar(): void {
    if (this.editando) {
      this.atualizarUsuario();
    } else {
      this.adicionarUsuario();
    }
  }

  novo(form: NgForm): void {
    form.reset();

    setTimeout(() => this.usuario = new Usuario(), 1);

    this.router.navigate(['/usuarios/novo']);
  }

  get editando(): boolean {
    return Boolean(this.usuario.codigo);
  }

  private carregarUsuario(codigo: number): void {
    this.usuarioService.buscarPorCodigo(codigo)
      .then(usuario => {
        this.usuario = usuario;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  private adicionarUsuario(): void {
    this.usuarioService.adicionar(this.usuario)
      .then(usuarioAdicionado => {
        this.messageService.add({ severity: 'success', detail: 'Usuário adicionado com sucesso!' });

        this.router.navigate(['/usuarios', usuarioAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  private atualizarUsuario(): void {
    this.usuarioService.atualizar(this.usuario)
      .then(usuario => {
        this.usuario = usuario;

        this.messageService.add({ severity: 'success', detail: 'Usuário alterado com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  private atualizarTituloEdicao(): void {
    this.title.setTitle(`Edição de usuário: ${this.usuario.nome}`);
  }

  private carregarCargos(): void {
    this.cargoService.listarTodos()
      .then(cargos => this.cargos = cargos.map((c: Cargo) => ({ label: c.nome, value: c })))
      .catch(erro => this.errorHandler.handle(erro));
  }

  private carregarPerfis(): void {
    this.perfilService.listarTodos()
      .then(perfis => this.perfis = perfis.map((p: Perfil) => ({ label: p.nome, value: p })))
      .catch(erro => this.errorHandler.handle(erro));
  }

}
