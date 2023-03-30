import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { InventarioModule } from '../inventario/inventario.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
  
    DashboardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    InventarioModule,
    SharedModule
  ],
  exports: [DashboardComponent]
})
export class HomeModule { }
