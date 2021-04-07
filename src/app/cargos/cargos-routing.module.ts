import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CargoCadastroComponent } from './cargo-cadastro/cargo-cadastro.component';
import { CargosPesquisaComponent } from './cargos-pesquisa/cargos-pesquisa.component';

const routes: Routes = [
  {
    path: '',
    component: CargosPesquisaComponent
  },
  {
    path: 'novo',
    component: CargoCadastroComponent
  },
  {
    path: ':codigo',
    component: CargoCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargosRoutingModule { }
