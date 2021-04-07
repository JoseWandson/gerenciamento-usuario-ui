import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PerfilCadastroComponent } from './perfil-cadastro/perfil-cadastro.component';
import { PerfisPesquisaComponent } from './perfis-pesquisa/perfis-pesquisa.component';

const routes: Routes = [
  {
    path: '',
    component: PerfisPesquisaComponent
  },
  {
    path: 'novo',
    component: PerfilCadastroComponent
  },
  {
    path: ':codigo',
    component: PerfilCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfisRoutingModule { }
