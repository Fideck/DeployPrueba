import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { RolComponent } from './rol/rol.component';
import { PermisosComponent } from './permisos/permisos.component';
import { AdminGuard } from 'src/app/core';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'usuario', component: UsuarioComponent },
      { path: 'rol', component: RolComponent },
      { path: 'permisos', component: PermisosComponent },
      { path: '**', redirectTo: 'usuario', pathMatch: 'full' },
    ],
    canActivateChild:[AdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccesoRoutingModule {}
