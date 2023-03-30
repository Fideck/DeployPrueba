import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminGuard } from './core/guards/admin.guard';
import { AuthModule } from './modules/auth/auth.module';
import { HomeModule } from './modules/home/home.module';
import { InventarioModule } from './modules/inventario/inventario.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";
import {StoreModule} from "@ngrx/store";
import {ROOT_STATE} from "./app.state";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "./modules/auth/state/auth.effects";
import {ProductEffects} from "./modules/inventario/producto/state/product.effects";



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    AuthModule,
    InventarioModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    StoreModule.forRoot(ROOT_STATE),
    EffectsModule.forRoot([AuthEffects, ProductEffects]),
    StoreDevtoolsModule.instrument({
          name: 'NgRx Demo App',
          logOnly: environment.production
      })
  ],
  providers: [CookieService, AdminGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
