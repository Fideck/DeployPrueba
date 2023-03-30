import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EgresoComponent } from './egreso/egreso.component';

const routes: Routes = [
  {path:'', children:[
    {path:'egreso', component:EgresoComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlmacenRoutingModule { }
