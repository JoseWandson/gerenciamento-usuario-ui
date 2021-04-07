import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { PerfisRoutingModule } from './perfis-routing.module';
import { PerfilCadastroComponent } from './perfil-cadastro/perfil-cadastro.component';
import { SharedModule } from '../shared/shared.module';
import { PerfisPesquisaComponent } from './perfis-pesquisa/perfis-pesquisa.component';

@NgModule({
  declarations: [
    PerfilCadastroComponent,
    PerfisPesquisaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,

    PerfisRoutingModule,
    SharedModule
  ]
})
export class PerfisModule { }
