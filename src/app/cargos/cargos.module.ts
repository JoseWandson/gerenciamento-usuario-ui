import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { CargosRoutingModule } from './cargos-routing.module';
import { CargoCadastroComponent } from './cargo-cadastro/cargo-cadastro.component';
import { SharedModule } from '../shared/shared.module';
import { CargosPesquisaComponent } from './cargos-pesquisa/cargos-pesquisa.component';
import { PerfisRoutingModule } from './../perfis/perfis-routing.module';

@NgModule({
  declarations: [
    CargoCadastroComponent,
    CargosPesquisaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,

    CargosRoutingModule,
    PerfisRoutingModule,
    SharedModule
  ]
})
export class CargosModule { }
